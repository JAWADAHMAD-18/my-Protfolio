"use client";

import * as React from "react";
import { Play, Pause, Volume2, VolumeX, RotateCcw } from "lucide-react";

interface TranscriptLine {
  id: number;
  speaker: string;
  time: number;
  text: string;
}

interface AudioPlayerProps {
  src: string;
  transcriptSrc?: string;
  title?: string;
  className?: string;
}

function formatTime(seconds: number): string {
  if (isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

export function AudioPlayer({
  src,
  transcriptSrc = "/audio/ahmed-demo-transcript.json",
  title = "Ahmed Demo Call Recording",
  className = "",
}: AudioPlayerProps) {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [isMuted, setIsMuted] = React.useState(false);
  const [transcript, setTranscript] = React.useState<TranscriptLine[]>([]);
  const [activeLineId, setActiveLineId] = React.useState<number | null>(null);

  React.useEffect(() => {
    fetch(transcriptSrc)
      .then((res) => res.json())
      .then((data: TranscriptLine[]) => setTranscript(data))
      .catch(() => {
        // Fallback placeholder transcript
        setTranscript([
          {
            id: 1,
            speaker: "Ahmed (AI Receptionist)",
            time: 0,
            text: "Hello, thank you for calling. How can I assist you today?",
          },
        ]);
      });
  }, [transcriptSrc]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const time = audioRef.current.currentTime;
    setCurrentTime(time);

    // Update active transcript line
    if (transcript.length > 0) {
      let currentActiveId = transcript[0].id;
      for (let i = 0; i < transcript.length; i++) {
        if (time >= transcript[i].time) {
          currentActiveId = transcript[i].id;
        } else {
          break;
        }
      }
      setActiveLineId(currentActiveId);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = parseFloat(e.target.value);
    setCurrentTime(targetTime);
    if (audioRef.current) {
      audioRef.current.currentTime = targetTime;
    }
  };

  const handleJumpToLine = (time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    if (!isPlaying) {
      audioRef.current.play().catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const restart = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
  };

  return (
    <div className={`rounded-[16px] border border-border bg-surface overflow-hidden shadow-sm ${className}`}>
      {/* Player Header & Controls */}
      <div className="p-5 sm:p-6 border-b border-border bg-surface-2/40">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
            <h3 className="font-semibold text-base text-text">{title}</h3>
          </div>
          <span className="font-mono text-xs text-muted">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>

        {/* Progress Bar / Scrubber */}
        <div className="flex items-center gap-3 mb-4">
          <input
            type="range"
            min={0}
            max={duration || 100}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-accent"
            aria-label="Audio scrubber"
          />
        </div>

        {/* Playback Controls Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-accent text-on-accent hover:bg-accent-2 flex items-center justify-center transition-colors shadow-xs cursor-pointer"
              aria-label={isPlaying ? "Pause audio demo" : "Play audio demo"}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </button>

            <button
              type="button"
              onClick={restart}
              className="w-9 h-9 rounded-full border border-border bg-surface text-muted hover:text-text hover:border-accent flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Restart audio from beginning"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={toggleMute}
            className="w-9 h-9 rounded-full border border-border bg-surface text-muted hover:text-text hover:border-accent flex items-center justify-center transition-colors cursor-pointer"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        <audio
          ref={audioRef}
          src={src}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={() => {
            if (audioRef.current) {
              setDuration(audioRef.current.duration || 24);
            }
          }}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          className="hidden"
        />
      </div>

      {/* Transcript Synchronized List */}
      <div className="p-5 sm:p-6 bg-surface max-h-[360px] overflow-y-auto">
        <p className="font-mono text-xs uppercase tracking-wider text-muted mb-4 font-semibold">
          Synchronized Call Transcript (Click to jump)
        </p>
        <div className="space-y-3">
          {transcript.map((line) => {
            const isActive = activeLineId === line.id;
            const isAI = line.speaker.includes("Ahmed") || line.speaker.includes("AI");

            return (
              <button
                key={line.id}
                type="button"
                onClick={() => handleJumpToLine(line.time)}
                className={`w-full text-left p-3 rounded-[10px] border transition-all cursor-pointer ${
                  isActive
                    ? "bg-accent/10 border-accent text-text shadow-xs"
                    : "bg-surface-2/40 border-border/60 hover:border-border text-muted"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`font-mono text-[11px] font-semibold ${
                      isAI
                        ? "text-accent-text dark:text-accent"
                        : "text-text"
                    }`}
                  >
                    {line.speaker}
                  </span>
                  <span className="font-mono text-[10px] text-muted">
                    {formatTime(line.time)}
                  </span>
                </div>
                <p className={`text-sm ${isActive ? "text-text font-medium" : "text-muted"}`}>
                  {line.text}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
