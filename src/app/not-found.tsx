"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, Search, ArrowLeft, Bot, Zap } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="relative">
          <div className="absolute inset-0 animate-pulse">
            <div className="w-24 h-24 mx-auto bg-orange-100 rounded-full flex items-center justify-center">
              <Bot className="w-12 h-12 text-orange-500" />
            </div>
          </div>
          <div className="relative w-24 h-24 mx-auto bg-orange-500 rounded-full flex items-center justify-center shadow-lg transform transition-all duration-500 hover:scale-105">
            <Bot className="w-12 h-12 text-white" />
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <h1 className="text-6xl font-bold text-gray-900 tracking-tight">
              4<span className="text-orange-500">0</span>4
            </h1>
            <h2 className="text-2xl font-semibold text-gray-800">
              Oops! Page Not Found
            </h2>
            <p className="text-gray-600 text-lg max-w-md mx-auto leading-relaxed">
              Even Voxa AI couldn't locate this page. It seems like you've
              ventured into uncharted digital territory.
            </p>
          </div>

          <Card className="p-6 bg-white/70 backdrop-blur-sm border-orange-200 shadow-lg max-w-md mx-auto">
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2 text-orange-600">
                <Search className="w-5 h-5" />
                <span className="font-medium">What happened?</span>
              </div>
              <div className="text-sm text-gray-600 space-y-2">
                <p>• The page you're looking for doesn't exist</p>
                <p>• The URL might be mistyped</p>
                <p>• The page may have been moved or deleted</p>
              </div>
            </div>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.history.back()}
              className="border-orange-200 text-orange-600 hover:bg-orange-50 px-8 py-3 rounded-full transition-all duration-300 hover:shadow-md flex items-center space-x-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Go Back</span>
            </Button>
          </div>
        </div>

        <div className="pt-8 border-t border-orange-100">
          <div className="flex items-center justify-center space-x-2 text-gray-500">
            <Bot className="w-5 h-5 text-orange-500" />
            <span className="font-semibold text-gray-700">Voxa AI</span>
            <span className="text-sm">• Always here to help</span>
          </div>
        </div>

        <div className="absolute top-10 left-10 w-20 h-20 bg-orange-100 rounded-full opacity-50 animate-bounce"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-orange-200 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-8 h-8 bg-orange-300 rounded-full opacity-40 animate-ping"></div>
      </div>
    </div>
  );
}
