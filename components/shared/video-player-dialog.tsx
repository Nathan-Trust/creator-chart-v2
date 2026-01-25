"use client";

import dynamic from "next/dynamic";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) as React.ComponentType<any>;

interface VideoPlayerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
  videoTitle?: string;
}

export function VideoPlayerDialog({
  isOpen,
  onClose,
  videoUrl,
  videoTitle,
}: VideoPlayerDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[800px] p-0 bg-black overflow-hidden border-none text-white">
        <DialogHeader className="p-4 absolute z-10 w-full bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
          <DialogTitle className="text-white text-lg font-bold truncate pr-8">
            {videoTitle || "Video"}
          </DialogTitle>
        </DialogHeader>
        <div className="aspect-video w-full relative bg-black flex items-center justify-center">
          {videoUrl && (
            <ReactPlayer
              key={videoUrl}
              url={videoUrl}
              width="100%"
              height="100%"
              controls
              playing
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
