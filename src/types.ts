import type { Sharp } from 'sharp'

export interface PluginOptions {
    /** 
     * Which paths to include when processing images.
     * @default '**\/*.{heic,heif,avif,jpeg,jpg,png,tiff,webp,gif}?*'
    */
    include: Array<string | RegExp> | string | RegExp
    /** 
     * What paths to exclude when processing images.
     * This defaults to the public dir to mirror vites behavior.
     * @default 'public\/**\/*'
    */
    exclude: Array<string | RegExp> | string | RegExp
    /** 
     * The path to the image cache.
     * You can set this to false to disable caching.
     * @default 'node_modules/.cache/vite-imagetools'
    */
    cache: string | false

    /**
     * An array of custom directives to include in the image processing pipeline.
     * @default []
     */
    customDirectives: Directive[]

    /**
     * An array of custom output formats to consider when generating the output for each image.
     * @default []
     */
    customOutputFormats: OutputFormat[]
}
export type ImageTransformation = (image: Sharp) => Sharp

export type DirectiveOptions = Record<string,any>
export type OutputFormat = (src:URL, outputMetadatas: Record<string, any>[]) => any


export interface DirectiveContext {
    useParam: (param: string) => void
    setMetadata: (key: string, value: any) => void
}

export type Directive<A = {}> = (cfg: DirectiveOptions & A, ctx: DirectiveContext) => ImageTransformation

export type ImageFormat = 'heic' | 'heif' | 'avif' | 'jpeg' | 'jpg' | 'png' | 'tiff' | 'webp' | 'gif'