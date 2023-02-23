/* eslint-disable indent */
/* eslint-disable linebreak-style */
import { BaseTexture } from '@pixi/core';
import { Sound } from '../Sound';
import { WebAudioMedia } from '../webaudio/WebAudioMedia';

interface RenderOptions {
  /**
   * offset start of the render.
   * @default 0
   */
  start?: number;
  /**
   * offset end of the render.
   * @default 0;

   */
  end?: number;
  /**
   * Width of the render.
   * @default 512
   */
  width?: number;
  /**
   * Height of the render.
   * @default 128
   */
  height?: number;
  /**
   * Fill style for waveform.
   * @default 'black'
   */
  fill?: string | CanvasPattern | CanvasGradient;
}

/**
 * Render image as Texture. **Only supported with WebAudio**
 * @memberof utils
 * @param sound - Instance of sound to render
 * @param options - Custom rendering options
 * @return Result texture
 */
function render(sound: Sound, options?: RenderOptions): BaseTexture {
  const canvas: HTMLCanvasElement = document.createElement('canvas');

  options = {
    start: 0,
    end: 0,
    width: 512,
    height: 128,
    fill: 'black',
    ...(options || {}),
  };
  if (options.start < 0 || options.start > options.width) options.start = 0;
  if (options.end === 0 || options.end > options.width) options.end = options.width;
  canvas.width = options.end - options.start;
  canvas.height = options.height;

  const baseTexture = BaseTexture.from(canvas);

  if (!(sound.media instanceof WebAudioMedia)) {
    return baseTexture;
  }

  const media: WebAudioMedia = sound.media as WebAudioMedia;

  // eslint-disable-next-line no-console
  console.assert(!!media.buffer, 'No buffer found, load first');

  const context: CanvasRenderingContext2D = canvas.getContext('2d');

  context.fillStyle = options.fill;
  const data: Float32Array = media.buffer.getChannelData(0);
  const step: number = Math.ceil(data.length / options.width);
  const amp: number = options.height / 2;

  for (let i = options.start; i < options.end; i++) {
    let min = 1.0;
    let max = -1.0;

    for (let j = 0; j < step; j++) {
      const datum: number = data[i * step + j];

      if (datum < min) {
        min = datum;
      }
      if (datum > max) {
        max = datum;
      }
    }
    context.fillRect(i - options.start, (1 + min) * amp, 1, Math.max(1, (max - min) * amp));
  }

  return baseTexture;
}

export type { RenderOptions };
export { render };
