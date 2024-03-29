/// <reference path="../global.d.ts" />
import { BaseTexture } from '@pixi/core';
import { EventEmitter } from '@pixi/utils';
import { ILoaderPlugin } from '@pixi/loaders';
import { ILoaderResource } from '@pixi/loaders';

/**
 * Callback when sound is completed.
 * @ignore
 * @param {Sound} sound - The instance of sound.
 */
export declare type CompleteCallback = (sound: Sound) => void;

/**
 * Filter for adding adding delaynode.
 *
 * @memberof filters
 */
declare class DistortionFilter extends Filter {
    /** The Wave shape node use to distort */
    private _distortion;
    /** The amount of distoration */
    private _amount;
    /** @param amount - The amount of distoration from 0 to 1. */
    constructor(amount?: number);
    /** The amount of distortion to set. */
    set amount(value: number);
    get amount(): number;
    destroy(): void;
}

/**
 * Filter for adding equalizer bands.
 *
 * @memberof filters
 */
declare class EqualizerFilter extends Filter {
    /**
     * Band at 32 Hz
     * @readonly
     */
    static readonly F32: number;
    /**
     * Band at 64 Hz
     * @readonly
     */
    static readonly F64: number;
    /**
     * Band at 125 Hz
     * @readonly
     */
    static readonly F125: number;
    /**
     * Band at 250 Hz
     * @readonly
     */
    static readonly F250: number;
    /**
     * Band at 500 Hz
     * @readonly
     */
    static readonly F500: number;
    /**
     * Band at 1000 Hz
     * @readonly
     */
    static readonly F1K: number;
    /**
     * Band at 2000 Hz
     * @readonly
     */
    static readonly F2K: number;
    /**
     * Band at 4000 Hz
     * @readonly
     */
    static readonly F4K: number;
    /**
     * Band at 8000 Hz
     * @readonly
     */
    static readonly F8K: number;
    /**
     * Band at 16000 Hz
     * @readonly
     */
    static readonly F16K: number;
    /**
     * The list of bands
     * @readonly
     */
    readonly bands: BiquadFilterNode[];
    /**
     * The map of bands to frequency
     * @readonly
     */
    readonly bandsMap: Record<number, BiquadFilterNode>;
    /**
     * @param f32 - Default gain for 32 Hz
     * @param f64 - Default gain for 64 Hz
     * @param f125 - Default gain for 125 Hz
     * @param f250 - Default gain for 250 Hz
     * @param f500 - Default gain for 500 Hz
     * @param f1k - Default gain for 1000 Hz
     * @param f2k - Default gain for 2000 Hz
     * @param f4k - Default gain for 4000 Hz
     * @param f8k - Default gain for 8000 Hz
     * @param f16k - Default gain for 16000 Hz
     */
    constructor(f32?: number, f64?: number, f125?: number, f250?: number, f500?: number, f1k?: number, f2k?: number, f4k?: number, f8k?: number, f16k?: number);
    /**
     * Set gain on a specific frequency.
     * @param frequency - The frequency, see EqualizerFilter.F* for bands
     * @param gain - Recommended -40 to 40.
     */
    setGain(frequency: number, gain?: number): void;
    /**
     * Get gain amount on a specific frequency.
     * @return The amount of gain set.
     */
    getGain(frequency: number): number;
    /**
     * Gain at 32 Hz frequencey.
     * @default 0
     */
    set f32(value: number);
    get f32(): number;
    /**
     * Gain at 64 Hz frequencey.
     * @default 0
     */
    set f64(value: number);
    get f64(): number;
    /**
     * Gain at 125 Hz frequencey.
     * @default 0
     */
    set f125(value: number);
    get f125(): number;
    /**
     * Gain at 250 Hz frequencey.
     * @default 0
     */
    set f250(value: number);
    get f250(): number;
    /**
     * Gain at 500 Hz frequencey.
     * @default 0
     */
    set f500(value: number);
    get f500(): number;
    /**
     * Gain at 1 KHz frequencey.
     * @default 0
     */
    set f1k(value: number);
    get f1k(): number;
    /**
     * Gain at 2 KHz frequencey.
     * @default 0
     */
    set f2k(value: number);
    get f2k(): number;
    /**
     * Gain at 4 KHz frequencey.
     * @default 0
     */
    set f4k(value: number);
    get f4k(): number;
    /**
     * Gain at 8 KHz frequencey.
     * @default 0
     */
    set f8k(value: number);
    get f8k(): number;
    /**
     * Gain at 16 KHz frequencey.
     * @default 0
     */
    set f16k(value: number);
    get f16k(): number;
    /** Reset all frequency bands to have gain of 0 */
    reset(): void;
    destroy(): void;
}

declare type ExtensionMap = Record<string, boolean>;

/**
 * The list of extensions that can be played.
 * @readonly
 * @memberof utils
 */
declare const extensions: string[];

/**
 * Represents a single sound element. Can be used to play, pause, etc. sound instances.
 *
 * @memberof filters
 */
export declare class Filter {
    /** The node to connect for the filter to the previous filter. */
    destination: AudioNode;
    /** The node to connect for the filter to the previous filter. */
    source: AudioNode;
    /**
     * @param {AudioNode} destination - The audio node to use as the destination for the input AudioNode
     * @param {AudioNode} [source] - Optional output node, defaults to destination node. This is useful
     *        when creating filters which contains multiple AudioNode elements chained together.
     */
    constructor(destination: AudioNode, source?: AudioNode);
    /** Reinitialize */
    protected init(destination: AudioNode, source?: AudioNode): void;
    /**
     * Connect to the destination.
     * @param {AudioNode} destination - The destination node to connect the output to
     */
    connect(destination: AudioNode): void;
    /** Completely disconnect filter from destination and source nodes. */
    disconnect(): void;
    /** Destroy the filter and don't use after this. */
    destroy(): void;
}

/**
 * Abstract class which SoundNodes and SoundContext
 * both extend. This provides the functionality for adding
 * dynamic filters.
 */
export declare class Filterable {
    /** Get the gain node */
    private _input;
    /** The destination output audio node */
    private _output;
    /** Collection of filters. */
    private _filters;
    /**
     * @param input - The source audio node
     * @param output - The output audio node
     */
    constructor(input: AudioNode, output: AudioNode);
    /** The destination output audio node */
    get destination(): AudioNode;
    /** The collection of filters. */
    get filters(): Filter[];
    set filters(filters: Filter[]);
    /** Cleans up. */
    destroy(): void;
}

declare namespace filters {
    export {
        Filter,
        EqualizerFilter,
        DistortionFilter,
        StereoFilter,
        ReverbFilter,
        MonoFilter,
        StreamFilter,
        TelephoneFilter
    }
}
export { filters }

declare namespace htmlaudio {
    export {
        HTMLAudioMedia,
        HTMLAudioInstance,
        HTMLAudioContext
    }
}
export { htmlaudio }

/**
 * The fallback version of WebAudioContext which uses `<audio>` instead of WebAudio API.
 * @memberof htmlaudio
 * @extends PIXI.util.EventEmitter
 */
declare class HTMLAudioContext extends EventEmitter implements IMediaContext {
    /** Current global speed from 0 to 1 */
    speed: number;
    /** Current muted status of the context */
    muted: boolean;
    /** Current volume from 0 to 1  */
    volume: number;
    /** Current paused status */
    paused: boolean;
    /** Internal trigger when volume, mute or speed changes */
    refresh(): void;
    /** Internal trigger paused changes */
    refreshPaused(): void;
    /**
     * HTML Audio does not support filters, this is non-functional API.
     */
    get filters(): Filter[];
    set filters(_filters: Filter[]);
    /**
     * HTML Audio does not support `audioContext`
     * @readonly
     * @type {AudioContext}
     */
    get audioContext(): AudioContext;
    /**
     * Toggles the muted state.
     * @return The current muted state.
     */
    toggleMute(): boolean;
    /**
     * Toggles the paused state.
     * @return The current paused state.
     */
    togglePause(): boolean;
    /** Destroy and don't use after this */
    destroy(): void;
}

/**
 * Instance which wraps the `<audio>` element playback.
 * @memberof htmlaudio
 * @extends PIXI.util.EventEmitter
 */
declare class HTMLAudioInstance extends EventEmitter implements IMediaInstance {
    /** Extra padding, in seconds, to deal with low-latecy of HTMLAudio. */
    static readonly PADDING: number;
    /** The current unique ID for this instance. */
    readonly id: number;
    /** The instance of the Audio element. */
    private _source;
    /** The instance of the Audio media element. */
    private _media;
    /** Playback rate, where 1 is 100%. */
    private _end;
    /** Current instance paused state. */
    private _paused;
    /** Current instance muted state. */
    private _muted;
    /** Current actual paused state. */
    private _pausedReal;
    /** Total length of the audio. */
    private _duration;
    /** Playback rate, where 1 is 100%. */
    private _start;
    /** `true` if the audio is actually playing. */
    private _playing;
    /** Volume for the instance. */
    private _volume;
    /** Speed for the instance. */
    private _speed;
    /** `true` for looping the playback */
    private _loop;
    /** @param parent - Parent element */
    constructor(parent: HTMLAudioMedia);
    /**
     * Set a property by name, this makes it easy to chain values
     * @param name - Name of the property to set
     * @param value - Value to set property to
     */
    set(name: 'speed' | 'volume' | 'muted' | 'loop' | 'paused', value: number | boolean): this;
    /** The current playback progress from 0 to 1. */
    get progress(): number;
    /** Pauses the sound. */
    get paused(): boolean;
    set paused(paused: boolean);
    /**
     * Reference: http://stackoverflow.com/a/40370077
     * @private
     */
    private _onPlay;
    /**
     * Reference: http://stackoverflow.com/a/40370077
     * @private
     */
    private _onPause;
    /**
     * Initialize the instance.
     * @param {htmlaudio.HTMLAudioMedia} media - Same as constructor
     */
    init(media: HTMLAudioMedia): void;
    /**
     * Stop the sound playing
     * @private
     */
    private _internalStop;
    /** Stop the sound playing */
    stop(): void;
    /** Set the instance speed from 0 to 1 */
    get speed(): number;
    set speed(speed: number);
    /** Get the set the volume for this instance from 0 to 1 */
    get volume(): number;
    set volume(volume: number);
    /** If the sound instance should loop playback */
    get loop(): boolean;
    set loop(loop: boolean);
    /** `true` if the sound is muted */
    get muted(): boolean;
    set muted(muted: boolean);
    /**
     * HTML Audio does not support filters, this is non-functional API.
     */
    get filters(): Filter[];
    set filters(_filters: Filter[]);
    /** Call whenever the loop, speed or volume changes */
    refresh(): void;
    /** Handle changes in paused state, either globally or sound or instance */
    refreshPaused(): void;
    /** Start playing the sound/ */
    play(options: PlayOptions): void;
    /**
     * Handle time update on sound.
     * @private
     */
    private _onUpdate;
    /**
     * Callback when completed.
     * @private
     */
    private _onComplete;
    /** Don't use after this. */
    destroy(): void;
    /**
     * To string method for instance.
     * @return The string representation of instance.
     */
    toString(): string;
}

/**
 * The fallback version of Sound which uses `<audio>` instead of WebAudio API.
 * @memberof htmlaudio
 * @extends PIXI.util.EventEmitter
 */
declare class HTMLAudioMedia extends EventEmitter implements IMedia {
    parent: Sound;
    private _source;
    init(parent: Sound): void;
    create(): HTMLAudioInstance;
    /**
     * If the audio media is playable (ready).
     * @readonly
     */
    get isPlayable(): boolean;
    /**
     * THe duration of the media in seconds.
     * @readonly
     */
    get duration(): number;
    /**
     * Reference to the context.
     * @readonly
     */
    get context(): HTMLAudioContext;
    /** The collection of filters, does not apply to HTML Audio. */
    get filters(): Filter[];
    set filters(_filters: Filter[]);
    destroy(): void;
    /**
     * Get the audio source element.
     * @type {HTMLAudioElement}
     * @readonly
     */
    get source(): HTMLAudioElement;
    load(callback?: LoadedCallback): void;
}

/**
 * Interface represents either a WebAudio source or an HTML5 AudioElement source
 */
export declare interface IMedia {
    /** Collection of global filters */
    filters: Filter[];
    /**
     * Reference to the context.
     * @readonly
     */
    readonly context: IMediaContext;
    /**
     * Length of sound in seconds.
     * @readonly
     */
    readonly duration: number;
    /**
     * Flag to check if sound is currently playable (e.g., has been loaded/decoded).
     * @readonly
     */
    readonly isPlayable: boolean;
    create(): IMediaInstance;
    init(sound: Sound): void;
    load(callback?: LoadedCallback): void;
    destroy(): void;
}

/**
 * Represents the audio context for playing back sounds. This can
 * represent either an HTML or WebAudio context.
 */
export declare interface IMediaContext {
    /**
     * `true` if all sounds are mute
     */
    muted: boolean;
    /**
     * Volume to apply to all sound
     */
    volume: number;
    /**
     * The speed of all sound
     */
    speed: number;
    /**
     * Set the paused state for all sound
     */
    paused: boolean;
    /**
     * Collection of global filter
     */
    filters: Filter[];
    /** Toggle mute for all sounds */
    toggleMute(): boolean;
    /** Toggle pause for all sounds */
    togglePause(): boolean;
    /** Dispatches event to refresh the paused state of playing instances. */
    refreshPaused(): void;
    /** Dispatch event to refresh all instances volume, mute, etc. */
    refresh(): void;
    /** Destroy the context and don't use after this. */
    destroy(): void;
    /** Reference to the Web Audio API AudioContext element, if Web Audio is available */
    audioContext: AudioContext;
}

/**
 * Interface for single instance return by a Sound play call. This can either
 * be a WebAudio or HTMLAudio instance.
 */
export declare interface IMediaInstance {
    /**
     * Auto-incrementing ID for the instance.
     * @readonly
     */
    readonly id: number;
    /**
     * Current progress of the sound from 0 to 1
     * @readonly
     */
    readonly progress: number;
    /**
     * If the instance is paused, if the sound or global context
     * is paused, this could still be false.
     */
    paused: boolean;
    /**
     * Current volume of the instance. This is not the actual volume
     * since it takes into account the global context and the sound volume.
     */
    volume: number;
    /**
     * Current speed of the instance. This is not the actual speed
     * since it takes into account the global context and the sound volume.
     */
    speed: number;
    /** If the current instance is set to loop */
    loop: boolean;
    /** Set the muted state of the instance */
    muted: boolean;
    /** Stop the current instance from playing. */
    stop(): void;
    /**
     * Fired when the sound finishes playing.
     * @event end
     */
    /**
     * Fired when the sound starts playing.
     * @event start
     */
    /**
     * The sound is stopped. Don't use after this is called.
     * @event stop
     */
    /**
     * Fired when the sound when progress updates.
     * @event progress
     * @param {number} progress - Playback progress from 0 to 1
     * @param {number} duration - The total number of seconds of audio
     */
    /**
     * Fired when paused state changes.
     * @event pause
     * @param {boolean} paused - If the current state is paused
     */
    /**
     * Fired when instance is paused.
     * @event paused
     */
    /**
     * Fired when instance is resumed.
     * @event resumed
     */
    refresh(): void;
    refreshPaused(): void;
    init(parent: IMedia): void;
    play(options: PlayOptions): void;
    destroy(): void;
    toString(): string;
    once(event: 'pause', fn: (paused: boolean) => void, context?: any): this;
    once(event: 'progress', fn: (progress: number, duration: number) => void, context?: any): this;
    once(event: 'resumed' | 'paused' | 'start' | 'end' | 'stop', fn: () => void, context?: any): this;
    on(event: 'pause', fn: (paused: boolean) => void, context?: any): this;
    on(event: 'progress', fn: (progress: number, duration: number) => void, context?: any): this;
    on(event: 'resumed' | 'paused' | 'start' | 'end' | 'stop', fn: () => void, context?: any): this;
    off(event: 'resumed' | 'paused' | 'start' | 'end' | 'progress' | 'pause' | 'stop', fn?: (...args: any[]) => void, context?: any, once?: boolean): this;
    /**
     * Fired when the sound when progress updates.
     * @param name - Name of property.
     * @param value - The total number of seconds of audio
     * @example
     * import { sound } from '@pixi/sound';
     * sound.play('foo')
     *   .set('volume', 0.5)
     *   .set('speed', 0.8);
     */
    set(name: 'speed' | 'volume' | 'muted' | 'loop' | 'paused', value: number | boolean): this;
}

/**
 * Callback when sound is loaded.
 * @ignore
 * @param {Error} err - The callback error.
 * @param {Sound} sound - The instance of new sound.
 * @param {IMediaInstance} instance - The instance of auto-played sound.
 */
export declare type LoadedCallback = (err: Error, sound?: Sound, instance?: IMediaInstance) => void;

/**
 * Combine all channels into mono channel.
 *
 * @memberof filters
 */
declare class MonoFilter extends Filter {
    /** Merger node */
    private _merger;
    constructor();
    destroy(): void;
}

/**
 * Options to use for creating sounds.
 */
export declare interface Options {
    /**
     * `true` to immediately start preloading.
     * @default false
     */
    autoPlay?: boolean;
    /**
     * `true` to disallow playing multiple layered instances at once.
     * @default false
     */
    singleInstance?: boolean;
    /**
     * The amount of volume 1 = 100%.
     * @default 1
     */
    volume?: number;
    /**
     * The playback rate where 1 is 100% speed.
     * @default 1
     */
    speed?: number;
    /**
     * Global complete callback when play is finished.
     * @type {Function}
     */
    complete?: CompleteCallback;
    /**
     * Call when finished loading.
     * @type {Function}
     */
    loaded?: LoadedCallback;
    /**
     * `true` to immediately start preloading if loading from `url`.
     */
    preload?: boolean;
    /**
     * Initial loop value, `true` is loop infinitely
     * @default false
     */
    loop?: boolean;
    /**
     * The source of the file being loaded
     */
    url?: string;
    /**
     * If sound is already preloaded, available.
     */
    source?: ArrayBuffer | AudioBuffer | HTMLAudioElement;
    /**
     * The map of sprite data. Where a sprite is an object
     * with a `start` and `end`, which are the times in seconds. Optionally, can include
     * a `speed` amount where 1 is 100% speed.
     */
    sprites?: Record<string, SoundSpriteData>;
}

/**
 * Increment the alias for play once
 * @static
 * @default 0
 */
declare let PLAY_ID: number;

/**
 * Create a new "Audio" stream based on given audio path and project uri; returns the audio object.
 * @memberof utils
 * @param url - Full path of the file to play.
 * @param {Function} callback - Callback when complete.
 * @return New audio element alias.
 */
declare function playOnce(url: string, callback?: (err?: Error) => void): string;

/**
 * Options used for sound playback.
 */
export declare interface PlayOptions {
    /**
     * Start time offset in seconds.
     * @default 0
     */
    start?: number;
    /**
     * End time in seconds.
     */
    end?: number;
    /**
     * Override default speed, default to the Sound's speed setting.
     */
    speed?: number;
    /**
     * Override default loop, default to the Sound's loop setting.
     */
    loop?: boolean;
    /**
     * Override default volume, default to the Sound's volume setting.
     */
    volume?: number;
    /**
     * The sprite to play.
     */
    sprite?: string;
    /**
     * If sound instance is muted by default.
     * @default false
     */
    muted?: boolean;
    /**
     * Filters that apply to play.
     * Only supported with WebAudio.
     */
    filters?: Filter[];
    /**
     * When completed.
     * @type {Function}
     */
    complete?: CompleteCallback;
    /**
     * If not already preloaded, callback when finishes load.
     * @type {Function}
     */
    loaded?: LoadedCallback;
    /**
     * Setting `true` will stop any playing instances. This is the same as
     * the singleInstance property on Sound, but is play-specific.
     */
    singleInstance?: boolean;
}

/**
 * Render image as Texture. **Only supported with WebAudio**
 * @memberof utils
 * @param sound - Instance of sound to render
 * @param options - Custom rendering options
 * @return Result texture
 */
declare function render(sound: Sound, options?: RenderOptions): BaseTexture;

declare interface RenderOptions {
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
 * Resolve a URL with different formats in glob pattern to
 * a path based on the supported browser format. For instance:
 * "sounds/music.{ogg,mp3}", would resolve to "sounds/music.ogg"
 * if "ogg" support is found, otherwise, fallback to "sounds.music.mp3"
 * @memberof utils
 * @param {string|PIXI.LoaderResource} source - - Path to resolve or Resource, if
 *        a Resource object is provided, automatically updates the extension and url
 *        of that object.
 * @return The format to resolve to
 */
declare function resolveUrl(source: string | ILoaderResource): string;

/**
 * Filter for adding reverb. Refactored from
 * https://github.com/web-audio-components/simple-reverb/
 *
 * @memberof filters
 */
declare class ReverbFilter extends Filter {
    private _seconds;
    private _decay;
    private _reverse;
    /**
     * @param seconds - Seconds for reverb
     * @param decay - The decay length
     * @param reverse - Reverse reverb
     */
    constructor(seconds?: number, decay?: number, reverse?: boolean);
    /**
     * Clamp a value
     * @param value
     * @param min - Minimum value
     * @param max - Maximum value
     * @return Clamped number
     */
    private _clamp;
    /**
     * Length of reverb in seconds from 1 to 50
     * @default 3
     */
    get seconds(): number;
    set seconds(seconds: number);
    /**
     * Decay value from 0 to 100
     * @default 2
     */
    get decay(): number;
    set decay(decay: number);
    /**
     * Reverse value from 0 to 1
     * @default false
     */
    get reverse(): boolean;
    set reverse(reverse: boolean);
    /**
     * Utility function for building an impulse response
     * from the module parameters.
     */
    private _rebuild;
}

/**
 * Create a new sound for a sine wave-based tone.  **Only supported with WebAudio**
 * @memberof utils
 * @param hertz - Frequency of sound.
 * @param seconds - Duration of sound in seconds.
 * @return New sound.
 */
declare function sineTone(hertz?: number, seconds?: number): Sound;

/**
 * Sound represents a single piece of loaded media. When playing a sound {@link IMediaInstance} objects
 * are created. Properties such a `volume`, `pause`, `mute`, `speed`, etc will have an effect on all instances.
 */
export declare class Sound {
    /** Pool of instances */
    private static _pool;
    /**
     * `true` if the buffer is loaded.
     * @default false
     */
    isLoaded: boolean;
    /**
     * `true` if the sound is currently being played.
     * @default false
     * @readonly
     */
    isPlaying: boolean;
    /**
     * true to start playing immediate after load.
     * @default false
     * @readonly
     */
    autoPlay: boolean;
    /**
     * `true` to disallow playing multiple layered instances at once.
     * @default false
     */
    singleInstance: boolean;
    /**
     * `true` to immediately start preloading.
     * @default false
     * @readonly
     */
    preload: boolean;
    /**
     * The file source to load.
     * @readonly
     */
    url: string;
    /**
     * The constructor options.
     * @readonly
     */
    options: Options;
    /** The audio source */
    media: IMedia;
    /** The collection of instances being played. */
    private _instances;
    /** The user defined sound sprites. */
    private _sprites;
    /** The options when auto-playing. */
    private _autoPlayOptions;
    /** The internal volume. */
    private _volume;
    /** The internal paused state. */
    private _paused;
    /** The internal muted state. */
    private _muted;
    /** The internal volume. */
    private _loop;
    /** The internal playbackRate */
    private _speed;
    /**
     * Create a new sound instance from source.
     * @param source - Either the path or url to the source file.
     *        or the object of options to use.
     * @return Created sound instance.
     */
    static from(source: string | Options | ArrayBuffer | HTMLAudioElement | AudioBuffer): Sound;
    /**
     * Use `Sound.from`
     * @ignore
     */
    constructor(media: IMedia, options: Options);
    /** Instance of the media context. */
    get context(): IMediaContext;
    /** Stops all the instances of this sound from playing. */
    pause(): this;
    /** Resuming all the instances of this sound from playing */
    resume(): this;
    /** Stops all the instances of this sound from playing. */
    get paused(): boolean;
    set paused(paused: boolean);
    /** The playback rate. */
    get speed(): number;
    set speed(speed: number);
    /** Set the filters. Only supported with WebAudio. */
    get filters(): Filter[];
    set filters(filters: Filter[]);
    /**
     * Add a sound sprite, which is a saved instance of a longer sound.
     * Similar to an image spritesheet.
     * @param alias - The unique name of the sound sprite.
     * @param data - Either completed function or play options.
     */
    addSprites(alias: string, data: SoundSpriteData): SoundSprite;
    /**
     * Convenience method to add more than one sprite add a time.
     * @param data - Map of sounds to add where the key is the alias,
     *        and the data are configuration options.
     * @return The map of sound sprites added.
     */
    addSprites(data: SoundSpriteDataMap): SoundSprites;
    /** Destructor, safer to use `SoundLibrary.remove(alias)` to remove this sound. */
    destroy(): void;
    /**
     * Remove a sound sprite.
     * @param alias - The unique name of the sound sprite, if alias is omitted, removes all sprites.
     */
    removeSprites(alias?: string): Sound;
    /** If the current sound is playable (loaded). */
    get isPlayable(): boolean;
    /** Stops all the instances of this sound from playing. */
    stop(): this;
    /**
     * Play a sound sprite, which is a saved instance of a longer sound.
     * Similar to an image spritesheet.
     * @method play
     * @instance
     * @param alias - The unique name of the sound sprite.
     * @param {Function} callback - Callback when completed.
     * @return The sound instance,
     *        this cannot be reused after it is done playing. Returns a Promise if the sound
     *        has not yet loaded.
     */
    play(alias: string, callback?: CompleteCallback): IMediaInstance | Promise<IMediaInstance>;
    /**
     * Plays the sound.
     * @method play
     * @instance
     * @param {Function|PlayOptions} source - Either completed function or play options.
     * @param {Function} callback - Callback when completed.
     * @return The sound instance,
     *        this cannot be reused after it is done playing. Returns a Promise if the sound
     *        has not yet loaded.
     */
    play(source?: string | PlayOptions | CompleteCallback, callback?: CompleteCallback): IMediaInstance | Promise<IMediaInstance>;
    /** Internal only, speed, loop, volume change occured. */
    refresh(): void;
    /** Handle changes in paused state. Internal only. */
    refreshPaused(): void;
    /** Gets and sets the volume. */
    get volume(): number;
    set volume(volume: number);
    /** Gets and sets the muted flag. */
    get muted(): boolean;
    set muted(muted: boolean);
    /** Gets and sets the looping. */
    get loop(): boolean;
    set loop(loop: boolean);
    /** Starts the preloading of sound. */
    private _preload;
    /** Gets the list of instances that are currently being played of this sound. */
    get instances(): IMediaInstance[];
    /** Get the map of sprites. */
    get sprites(): SoundSprites;
    /** Get the duration of the audio in seconds. */
    get duration(): number;
    /** Auto play the first instance. */
    autoPlayStart(): IMediaInstance;
    /** Removes all instances. */
    private _removeInstances;
    /**
     * Sound instance completed.
     * @param instance
     */
    private _onComplete;
    /** Create a new instance. */
    private _createInstance;
    /**
     * Destroy/recycling the instance object.
     * @param instance - Instance to recycle
     */
    private _poolInstance;
}

export declare const sound: SoundLibrary;

/**
 * Manages the playback of sounds. This is the main class for PixiJS Sound. If you're
 * using the browser-based bundled this is `PIXI.sound`. Otherwise, you can do this:
 * @example
 * import { sound } from '@pixi/sound';
 *
 * // sound is an instance of SoundLibrary
 * sound.add('my-sound', 'path/to/file.mp3');
 * sound.play('my-sound');
 */
export declare class SoundLibrary {
    /**
     * For legacy approach for Audio. Instead of using WebAudio API
     * for playback of sounds, it will use HTML5 `<audio>` element.
     */
    private _useLegacy;
    /** The global context to use. */
    private _context;
    /** The WebAudio specific context */
    private _webAudioContext;
    /** The HTML Audio (legacy) context. */
    private _htmlAudioContext;
    /** The map of all sounds by alias. */
    private _sounds;
    constructor();
    /**
     * Re-initialize the sound library, this will
     * recreate the AudioContext. If there's a hardware-failure
     * call `close` and then `init`.
     * @return Sound instance
     */
    init(): this;
    /**
     * The global context to use.
     * @readonly
     */
    get context(): IMediaContext;
    /**
     * Apply filters to all sounds. Can be useful
     * for setting global planning or global effects.
     * **Only supported with WebAudio.**
     * @example
     * import { sound, filters } from '@pixi/sound';
     * // Adds a filter to pan all output left
     * sound.filtersAll = [
     *     new filters.StereoFilter(-1)
     * ];
     */
    get filtersAll(): Filter[];
    set filtersAll(filtersAll: Filter[]);
    /**
     * `true` if WebAudio is supported on the current browser.
     */
    get supported(): boolean;
    /**
     * Register an existing sound with the library cache.
     * @method add
     * @instance
     * @param {string} alias - The sound alias reference.
     * @param {Sound} sound - Sound reference to use.
     * @return {Sound} Instance of the Sound object.
     */
    /**
     * Adds a new sound by alias.
     * @param alias - The sound alias reference.
     * @param {ArrayBuffer|AudioBuffer|String|Options|HTMLAudioElement} options - Either the path or url to the source file.
     *        or the object of options to use.
     * @return Instance of the Sound object.
     */
    add(alias: string, options: Options | string | ArrayBuffer | AudioBuffer | HTMLAudioElement | Sound): Sound;
    /**
     * Adds multiple sounds at once.
     * @param map - Map of sounds to add, the key is the alias, the value is the
     *        `string`, `ArrayBuffer`, `AudioBuffer`, `HTMLAudioElement` or the list of options
     *        (see {@link Options} for full options).
     * @param globalOptions - The default options for all sounds.
     *        if a property is defined, it will use the local property instead.
     * @return Instance to the Sound object.
     */
    add(map: SoundSourceMap, globalOptions?: Options): SoundMap;
    /**
     * Internal methods for getting the options object
     * @private
     * @param source - The source options
     * @param overrides - Override default options
     * @return The construction options
     */
    private _getOptions;
    /**
     * Do not use WebAudio, force the use of legacy. This **must** be called before loading any files.
     */
    get useLegacy(): boolean;
    set useLegacy(legacy: boolean);
    /**
     * Removes a sound by alias.
     * @param alias - The sound alias reference.
     * @return Instance for chaining.
     */
    remove(alias: string): this;
    /**
     * Set the global volume for all sounds. To set per-sound volume see {@link SoundLibrary#volume}.
     */
    get volumeAll(): number;
    set volumeAll(volume: number);
    /**
     * Set the global speed for all sounds. To set per-sound speed see {@link SoundLibrary#speed}.
     */
    get speedAll(): number;
    set speedAll(speed: number);
    /**
     * Toggle paused property for all sounds.
     * @return `true` if all sounds are paused.
     */
    togglePauseAll(): boolean;
    /**
     * Pauses any playing sounds.
     * @return Instance for chaining.
     */
    pauseAll(): this;
    /**
     * Resumes any sounds.
     * @return Instance for chaining.
     */
    resumeAll(): this;
    /**
     * Toggle muted property for all sounds.
     * @return `true` if all sounds are muted.
     */
    toggleMuteAll(): boolean;
    /**
     * Mutes all playing sounds.
     * @return Instance for chaining.
     */
    muteAll(): this;
    /**
     * Unmutes all playing sounds.
     * @return Instance for chaining.
     */
    unmuteAll(): this;
    /**
     * Stops and removes all sounds. They cannot be used after this.
     * @return Instance for chaining.
     */
    removeAll(): this;
    /**
     * Stops all sounds.
     * @return Instance for chaining.
     */
    stopAll(): this;
    /**
     * Checks if a sound by alias exists.
     * @param alias - Check for alias.
     * @param assert - Whether enable console.assert.
     * @return true if the sound exists.
     */
    exists(alias: string, assert?: boolean): boolean;
    /**
     * Find a sound by alias.
     * @param alias - The sound alias reference.
     * @return Sound object.
     */
    find(alias: string): Sound;
    /**
     * Plays a sound.
     * @method play
     * @instance
     * @param {string} alias - The sound alias reference.
     * @param {string} sprite - The alias of the sprite to play.
     * @return {IMediaInstance|null} The sound instance, this cannot be reused
     *         after it is done playing. Returns `null` if the sound has not yet loaded.
     */
    /**
     * Plays a sound.
     * @param alias - The sound alias reference.
     * @param {PlayOptions|Function} options - The options or callback when done.
     * @return The sound instance,
     *        this cannot be reused after it is done playing. Returns a Promise if the sound
     *        has not yet loaded.
     */
    play(alias: string, options?: PlayOptions | CompleteCallback | string): IMediaInstance | Promise<IMediaInstance>;
    /**
     * Stops a sound.
     * @param alias - The sound alias reference.
     * @return Sound object.
     */
    stop(alias: string): Sound;
    /**
     * Pauses a sound.
     * @param alias - The sound alias reference.
     * @return Sound object.
     */
    pause(alias: string): Sound;
    /**
     * Resumes a sound.
     * @param alias - The sound alias reference.
     * @return Instance for chaining.
     */
    resume(alias: string): Sound;
    /**
     * Get or set the volume for a sound.
     * @param alias - The sound alias reference.
     * @param volume - Optional current volume to set.
     * @return The current volume.
     */
    volume(alias: string, volume?: number): number;
    /**
     * Get or set the speed for a sound.
     * @param alias - The sound alias reference.
     * @param speed - Optional current speed to set.
     * @return The current speed.
     */
    speed(alias: string, speed?: number): number;
    /**
     * Get the length of a sound in seconds.
     * @param alias - The sound alias reference.
     * @return The current duration in seconds.
     */
    duration(alias: string): number;
    /**
     * Closes the sound library. This will release/destroy
     * the AudioContext(s). Can be used safely if you want to
     * initialize the sound library later. Use `init` method.
     */
    close(): this;
}

/**
 * Sound middleware installation utilities for PIXI.Loader
 */
export declare class SoundLoader implements ILoaderPlugin {
    /** Used for PixiJS 6.5.0 extensions API */
    static extension: string;
    /** Install the middleware */
    static add(): void;
    /**
     * Set the legacy mode
     * @param legacy - Non-webaudio environments
     */
    static setLegacy(legacy: boolean): void;
    /** Handle the preprocessing of file paths */
    static pre(resource: ILoaderResource, next: () => void): void;
    /** Actual resource-loader middleware for sound class */
    static use(resource: ILoaderResource, next: () => void): void;
}

export declare type SoundMap = Record<string, Sound>;

export declare type SoundSourceMap = Record<string, Options | string | ArrayBuffer | AudioBuffer | HTMLAudioElement>;

/**
 * Object that represents a single Sound's sprite. To add sound sprites
 * use the {@link Sound#addSprites} method.
 * @example
 * import { sound } from '@pixi/sound';
 * sound.add('alias', {
 *   url: 'path/to/file.ogg',
 *   sprites: {
 *     blast: { start: 0, end: 0.2 },
 *     boom: { start: 0.3, end: 0.5 },
 *   },
 *   loaded() {
 *     sound.play('alias', 'blast');
 *   }
 * );
 *
 */
export declare class SoundSprite {
    /**
     * The reference sound
     * @readonly
     */
    parent: Sound;
    /**
     * The starting location in seconds.
     * @readonly
     */
    start: number;
    /**
     * The ending location in seconds
     * @readonly
     */
    end: number;
    /**
     * The speed override where 1 is 100% speed playback.
     * @readonly
     */
    speed: number;
    /**
     * The duration of the sound in seconds.
     * @readonly
     */
    duration: number;
    /**
     * Whether to loop the sound sprite.
     * @readonly
     */
    loop: boolean;
    /**
     * @param parent - The parent sound
     * @param options - Data associated with object.
     */
    constructor(parent: Sound, options: SoundSpriteData);
    /**
     * Play the sound sprite.
     * @param {Function} [complete] - Function call when complete
     * @return Sound instance being played.
     */
    play(complete?: CompleteCallback): IMediaInstance | Promise<IMediaInstance>;
    /** Destroy and don't use after this */
    destroy(): void;
}

/** Data for adding new sound sprites. */
export declare interface SoundSpriteData {
    /** The start time in seconds. */
    start: number;
    /** The end time in seconds. */
    end: number;
    /** The optional speed, if not speed, uses the default speed of the parent. */
    speed?: number;
}

export declare type SoundSpriteDataMap = Record<string, SoundSpriteData>;

export declare type SoundSprites = Record<string, SoundSprite>;

/** Output for cloning source node. */
declare interface SourceClone {
    /** Cloned audio buffer source */
    source: AudioBufferSourceNode;
    /** Independent volume control */
    gain: GainNode;
}

/**
 * Filter for adding Stereo panning.
 *
 * @memberof filters
 */
declare class StereoFilter extends Filter {
    /** The stereo panning node */
    private _stereo;
    /** The stereo panning node */
    private _panner;
    /** The amount of panning, -1 is left, 1 is right, 0 is centered */
    private _pan;
    /** @param pan - The amount of panning, -1 is left, 1 is right, 0 is centered. */
    constructor(pan?: number);
    /** Set the amount of panning, where -1 is left, 1 is right, and 0 is centered */
    set pan(value: number);
    get pan(): number;
    destroy(): void;
}

/**
 * Export a MediaStream to be recorded
 *
 * @memberof filters
 */
declare class StreamFilter extends Filter {
    private _stream;
    constructor();
    get stream(): MediaStream;
    destroy(): void;
}

/**
 * The list of browser supported audio formats.
 * @readonly
 * @memberof utils
 * @property {boolean} mp3 - `true` if file-type is supported
 * @property {boolean} ogg - `true` if file-type is supported
 * @property {boolean} oga - `true` if file-type is supported
 * @property {boolean} opus - `true` if file-type is supported
 * @property {boolean} mpeg - `true` if file-type is supported
 * @property {boolean} wav - `true` if file-type is supported
 * @property {boolean} aiff - `true` if file-type is supported
 * @property {boolean} wma - `true` if file-type is supported
 * @property {boolean} mid - `true` if file-type is supported
 * @property {boolean} caf - `true` if file-type is supported. Note that for this we check if the
 *                             'opus' codec is supported inside the caf container.
 */
declare const supported: ExtensionMap;

/**
 * Creates a telephone-sound filter.
 *
 * @memberof filters
 */
declare class TelephoneFilter extends Filter {
    constructor();
}

declare namespace utils {
    export {
        playOnce,
        PLAY_ID,
        RenderOptions,
        render,
        resolveUrl,
        sineTone,
        validateFormats,
        supported,
        extensions
    }
}
export { utils }

/**
 * Function to validate file type formats. This is called when the library initializes, but can
 * be called again if you need to recognize a format not listed in `utils.extensions` at
 * initialization.
 * @memberof utils
 * @param typeOverrides - - Dictionary of type overrides (inputs for
 *                                 AudioElement.canPlayType()), keyed by extension from the
 *                                 utils.extensions array.
 */
declare function validateFormats(typeOverrides?: Record<string, string>): void;

declare namespace webaudio {
    export {
        WebAudioMedia,
        WebAudioInstance,
        SourceClone,
        WebAudioNodes,
        WebAudioContext,
        WebAudioUtils
    }
}
export { webaudio }

/**
 * Main class to handle WebAudio API. There's a simple chain
 * of AudioNode elements: analyser > compressor > context.destination.
 * any filters that are added are inserted between the analyser and compressor nodes
 * @memberof webaudio
 */
declare class WebAudioContext extends Filterable implements IMediaContext {
    /**
     * Context Compressor node
     * @readonly
     */
    compressor: DynamicsCompressorNode;
    /**
     * Context Analyser node
     * @readonly
     */
    analyser: AnalyserNode;
    /**
     * Global speed of all sounds
     * @readonly
     */
    speed: number;
    /**
     * Sets the muted state.
     * @default false
     */
    muted: boolean;
    /**
     * Sets the volume from 0 to 1.
     * @default 1
     */
    volume: number;
    /**
     * Handle global events
     * @type {PIXI.utils.EventEmitter}
     */
    events: EventEmitter;
    /** The instance of the AudioContext for WebAudio API. */
    private _ctx;
    /** The instance of the OfflineAudioContext for fast decoding audio. */
    private _offlineCtx;
    /** Current paused status */
    private _paused;
    /**
     * Indicated whether audio on iOS has been unlocked, which requires a touchend/mousedown event that plays an
     * empty sound.
     */
    private _unlocked;
    constructor();
    /**
     * Try to unlock audio on iOS. This is triggered from either WebAudio plugin setup (which will work if inside of
     * a `mousedown` or `touchend` event stack), or the first document touchend/mousedown event. If it fails (touchend
     * will fail if the user presses for too long, indicating a scroll event instead of a click event.
     *
     * Note that earlier versions of iOS supported `touchstart` for this, but iOS9 removed this functionality. Adding
     * a `touchstart` event to support older platforms may preclude a `mousedown` even from getting fired on iOS9, so we
     * stick with `mousedown` and `touchend`.
     */
    private _unlock;
    /**
     * Plays an empty sound in the web audio context.  This is used to enable web audio on iOS devices, as they
     * require the first sound to be played inside of a user initiated event (touch/click).
     */
    playEmptySound(): void;
    /**
     * Get AudioContext class, if not supported returns `null`
     * @type {AudioContext}
     * @readonly
     */
    static get AudioContext(): typeof AudioContext;
    /**
     * Get OfflineAudioContext class, if not supported returns `null`
     * @type {OfflineAudioContext}
     * @readonly
     */
    static get OfflineAudioContext(): typeof OfflineAudioContext;
    /** Destroy this context. */
    destroy(): void;
    /**
     * The WebAudio API AudioContext object.
     * @readonly
     * @type {AudioContext}
     */
    get audioContext(): AudioContext;
    /**
     * The WebAudio API OfflineAudioContext object.
     * @readonly
     * @type {OfflineAudioContext}
     */
    get offlineContext(): OfflineAudioContext;
    /**
     * Pauses all sounds, even though we handle this at the instance
     * level, we'll also pause the audioContext so that the
     * time used to compute progress isn't messed up.
     * @default false
     */
    set paused(paused: boolean);
    get paused(): boolean;
    /** Emit event when muted, volume or speed changes */
    refresh(): void;
    /** Emit event when muted, volume or speed changes */
    refreshPaused(): void;
    /**
     * Toggles the muted state.
     * @return The current muted state.
     */
    toggleMute(): boolean;
    /**
     * Toggles the paused state.
     * @return The current muted state.
     */
    togglePause(): boolean;
    /**
     * Decode the audio data
     * @param arrayBuffer - Buffer from loader
     * @param callback - When completed, error and audioBuffer are parameters.
     */
    decode(arrayBuffer: ArrayBuffer, callback: (err?: Error, buffer?: AudioBuffer) => void): void;
}

/**
 * A single play instance that handles the AudioBufferSourceNode.
 * @memberof webaudio
 * @extends PIXI.utils.EventEmitter
 */
declare class WebAudioInstance extends EventEmitter implements IMediaInstance {
    /**
     * The current unique ID for this instance.
     * @readonly
     */
    readonly id: number;
    /** The source Sound. */
    private _media;
    /** true if paused. */
    private _paused;
    /** true if muted. */
    private _muted;
    /** true if paused. */
    private _pausedReal;
    /** The instance volume */
    private _volume;
    /** Last update frame number. */
    private _lastUpdate;
    /** The total number of seconds elapsed in playback. */
    private _elapsed;
    /** Playback rate, where 1 is 100%. */
    private _speed;
    /** Playback rate, where 1 is 100%. */
    private _end;
    /** `true` if should be looping. */
    private _loop;
    /** Gain node for controlling volume of instance */
    private _gain;
    /** Length of the sound in seconds. */
    private _duration;
    /** The progress of the sound from 0 to 1. */
    private _progress;
    /** Audio buffer source clone from Sound object. */
    private _source;
    /** The filters */
    private _filters;
    constructor(media: WebAudioMedia);
    /**
     * Set a property by name, this makes it easy to chain values
     * @param name - Name of the property to set.
     * @param value - Value to set property to.
     */
    set(name: 'speed' | 'volume' | 'muted' | 'loop' | 'paused', value: number | boolean): this;
    /** Stops the instance, don't use after this. */
    stop(): void;
    /** Set the instance speed from 0 to 1 */
    get speed(): number;
    set speed(speed: number);
    /** Get the set the volume for this instance from 0 to 1 */
    get volume(): number;
    set volume(volume: number);
    /** `true` if the sound is muted */
    get muted(): boolean;
    set muted(muted: boolean);
    /** If the sound instance should loop playback */
    get loop(): boolean;
    set loop(loop: boolean);
    /** The collection of filters. */
    get filters(): Filter[];
    set filters(filters: Filter[]);
    /** Refresh loop, volume and speed based on changes to parent */
    refresh(): void;
    /** Connect filters nodes to audio context */
    private applyFilters;
    /** Handle changes in paused state, either globally or sound or instance */
    refreshPaused(): void;
    /**
     * Plays the sound.
     * @param options - Play options.
     */
    play(options: PlayOptions): void;
    /** Start the update progress. */
    private enableTicker;
    /** The current playback progress from 0 to 1. */
    get progress(): number;
    /** Pauses the sound. */
    get paused(): boolean;
    set paused(paused: boolean);
    /** Don't use after this. */
    destroy(): void;
    /**
     * To string method for instance.
     * @return The string representation of instance.
     */
    toString(): string;
    /**
     * Get the current time in seconds.
     * @return Seconds since start of context
     */
    private _now;
    /** Callback for update listener */
    private _updateListener;
    /** Internal update the progress. */
    private _update;
    /** Initializes the instance. */
    init(media: WebAudioMedia): void;
    /** Stops the instance. */
    private _internalStop;
    /** Callback when completed. */
    private _onComplete;
}

/**
 * Represents a single sound element. Can be used to play, pause, etc. sound instances.
 * @memberof webaudio
 */
declare class WebAudioMedia implements IMedia {
    /**
     * Reference to the parent Sound container.
     * @readonly
     */
    parent: Sound;
    /**
     * The file buffer to load.
     * @readonly
     */
    source: ArrayBuffer | AudioBuffer;
    /** Instance of the chain builder. */
    private _nodes;
    /** Instance of the source node. */
    private _source;
    /**
     * Re-initialize without constructing.
     * @param parent - - Instance of parent Sound container
     */
    init(parent: Sound): void;
    /** Destructor, safer to use `SoundLibrary.remove(alias)` to remove this sound. */
    destroy(): void;
    create(): WebAudioInstance;
    get context(): WebAudioContext;
    get isPlayable(): boolean;
    get filters(): Filter[];
    set filters(filters: Filter[]);
    get duration(): number;
    /** Gets and sets the buffer. */
    get buffer(): AudioBuffer;
    set buffer(buffer: AudioBuffer);
    /** Get the current chained nodes object */
    get nodes(): WebAudioNodes;
    load(callback?: LoadedCallback): void;
    /** Loads a sound using XHMLHttpRequest object. */
    private _loadUrl;
    /**
     * Decodes the array buffer.
     * @param arrayBuffer - From load.
     * @param {Function} callback - Callback optional
     */
    private _decode;
}

/**
 * @memberof webaudio
 */
declare class WebAudioNodes extends Filterable {
    /**
     * The buffer size for script processor, default is `0` which auto-detects. If you plan to use
     * script node on iOS, you'll need to provide a non-zero amount.
     * @default 0
     */
    static BUFFER_SIZE: number;
    /**
     * Get the buffer source node
     * @readonly
     */
    bufferSource: AudioBufferSourceNode;
    /**
     * Get the gain node
     * @readonly
     */
    gain: GainNode;
    /**
     * Get the analyser node
     * @readonly
     */
    analyser: AnalyserNode;
    /**
     * Reference to the SoundContext
     * @readonly
     */
    context: WebAudioContext;
    /** Private reference to the script processor node. */
    private _script;
    /**
     * @param context - The audio context.
     */
    constructor(context: WebAudioContext);
    /**
     * Get the script processor node.
     * @readonly
     */
    get script(): ScriptProcessorNode;
    /** Cleans up. */
    destroy(): void;
    /**
     * Clones the bufferSource. Used just before playing a sound.
     * @returns {SourceClone} The clone AudioBufferSourceNode.
     */
    cloneBufferSource(): SourceClone;
    /**
     * Get buffer size of `ScriptProcessorNode`.
     * @readonly
     */
    get bufferSize(): number;
}

/**
 * Internal class for Web Audio abstractions and convenience methods.
 * @memberof webaudio
 */
declare class WebAudioUtils {
    /**
     * Dezippering is removed in the future Web Audio API, instead
     * we use the `setValueAtTime` method, however, this is not available
     * in all environments (e.g., Android webview), so we fallback to the `value` setter.
     * @param param - AudioNode parameter object
     * @param value - Value to set
     * @return The value set
     */
    static setParamValue(param: AudioParam, value: number): number;
}

export { }
