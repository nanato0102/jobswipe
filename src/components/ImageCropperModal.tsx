"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { X, ZoomIn, ZoomOut, Check, RotateCcw, Crop } from "lucide-react";

interface ImageCropperModalProps {
  isOpen: boolean;
  imageSrc: string | null;
  onClose: () => void;
  onCropComplete: (croppedDataUrl: string) => void;
  title?: string;
}

export default function ImageCropperModal({
  isOpen,
  imageSrc,
  onClose,
  onCropComplete,
  title = "画像の切り抜き位置を調整",
}: ImageCropperModalProps) {
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);

  const imageRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // 初期化
  useEffect(() => {
    if (isOpen) {
      setZoom(1);
      setOffset({ x: 0, y: 0 });
      setImageLoaded(false);
    }
  }, [isOpen, imageSrc]);

  // マウスドラッグ
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      setOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    },
    [isDragging, dragStart]
  );

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // タッチドラッグ（スマホ対応）
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - offset.x,
        y: e.touches[0].clientY - offset.y,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    setOffset({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // 切り抜き処理（Canvas描画）
  const handleCrop = () => {
    if (!imageRef.current || !containerRef.current) return;

    const img = imageRef.current;
    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const cropSize = Math.min(containerRect.width, containerRect.height) * 0.8; // 切り抜き枠のサイズ (px)

    const canvas = document.createElement("canvas");
    const outputSize = 500; // 高解像度 500x500px 出力
    canvas.width = outputSize;
    canvas.height = outputSize;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    // 白背景で初期化（透明PNG等のため）
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, outputSize, outputSize);

    // 画像の表示スケールと描画位置を計算
    const imgNaturalWidth = img.naturalWidth;
    const imgNaturalHeight = img.naturalHeight;

    // containerの中心に対するクロップ枠の位置
    const cropCenterX = containerRect.width / 2;
    const cropCenterY = containerRect.height / 2;

    // 表示中の画像サイズ
    const imgDisplayWidth = img.clientWidth * zoom;
    const imgDisplayHeight = img.clientHeight * zoom;

    // 表示中の画像中心位置
    const imgCenterX = containerRect.width / 2 + offset.x;
    const imgCenterY = containerRect.height / 2 + offset.y;

    // クロップ枠左上に対する画像のオフセット
    const cropLeft = cropCenterX - cropSize / 2;
    const cropTop = cropCenterY - cropSize / 2;

    // Canvas座標系へのマッピング
    const scaleRatio = outputSize / cropSize;
    const renderX = (imgCenterX - imgDisplayWidth / 2 - cropLeft) * scaleRatio;
    const renderY = (imgCenterY - imgDisplayHeight / 2 - cropTop) * scaleRatio;
    const renderWidth = imgDisplayWidth * scaleRatio;
    const renderHeight = imgDisplayHeight * scaleRatio;

    ctx.drawImage(img, renderX, renderY, renderWidth, renderHeight);

    const croppedDataUrl = canvas.toDataURL("image/jpeg", 0.92);
    onCropComplete(croppedDataUrl);
    onClose();
  };

  const handleReset = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  if (!isOpen || !imageSrc) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl p-5 sm:p-6 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4 animate-scale-in flex flex-col">
        {/* ヘッダー */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
              <Crop className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-slate-900">{title}</h3>
              <p className="text-[11px] text-slate-500">ドラッグで位置調整、スライダーで拡大・縮小できます</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* クロップビューワー */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative w-full aspect-square bg-slate-950 rounded-2xl overflow-hidden cursor-move select-none flex items-center justify-center"
        >
          {/* 画像要素 */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imageRef}
            src={imageSrc}
            alt="切り抜き対象"
            onLoad={() => setImageLoaded(true)}
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
              transition: isDragging ? "none" : "transform 0.1s ease-out",
            }}
            className="max-w-full max-h-full object-contain pointer-events-none"
            draggable={false}
          />

          {/* 正方形切り抜きガイド枠オーバーレイ */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {/* 切り抜き枠外側の半透明暗幕 */}
            <div className="w-[80%] aspect-square rounded-2xl border-2 border-white shadow-[0_0_0_9999px_rgba(15,23,42,0.65)] relative">
              {/* 四隅のコーナーマーク */}
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-emerald-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-emerald-400" />
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-emerald-400" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-emerald-400" />
            </div>
          </div>
        </div>

        {/* ズームコントローラー */}
        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1">
              <ZoomIn className="w-3.5 h-3.5 text-slate-500" />
              <span>拡大・縮小</span>
            </span>
            <span className="text-slate-500">{zoom.toFixed(1)}x</span>
          </div>

          <div className="flex items-center gap-3">
            <ZoomOut className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <input
              type="range"
              min="1"
              max="3"
              step="0.05"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="flex-1 accent-slate-900 cursor-pointer"
            />
            <ZoomIn className="w-4 h-4 text-slate-400 flex-shrink-0" />

            <button
              type="button"
              onClick={handleReset}
              className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors shadow-2xs"
              title="位置とサイズをリセット"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* アクションボタン */}
        <div className="flex gap-2.5 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            キャンセル
          </button>
          <button
            type="button"
            onClick={handleCrop}
            className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            <span>この位置で切り抜く</span>
          </button>
        </div>
      </div>
    </div>
  );
}
