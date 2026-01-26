import React from 'react';

export interface Episode {
  id: string;
  title: string;
  author: string;
  description: string;
  duration: string;
  imageUrl: string;
  audioUrl: string;
  category: string;
}

export interface PlayState {
  isPlaying: boolean;
  currentEpisode: Episode | null;
  progress: number; // 0 to 100
}