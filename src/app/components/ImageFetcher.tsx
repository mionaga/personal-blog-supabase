'use client';

import { supabase } from '@/utils/supabase';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

type ImageFetcherProps = {
    thumbnailImageKey: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
  }

const ImageFetcher = ({ thumbnailImageKey, alt, width, height, className }: ImageFetcherProps) => {
    const [thumbnailImageUrl, setThumbnailImageUrl] = useState<null | string>(null)
 
    useEffect(() => {
        if (!thumbnailImageKey) return;

        const fetchImage = async () => {
            const {
                data: { publicUrl },
            } = await supabase.storage
                .from('article_thumbnail')
                .getPublicUrl(thumbnailImageKey);

            setThumbnailImageUrl(publicUrl)
        }
        fetchImage();
    }, [thumbnailImageKey]);

    if (!thumbnailImageUrl) return null;

    return (
        <Image 
        src={thumbnailImageUrl}
        alt='alt'
        width={width}
        height={height}
        className={className}
    />
    )
}

export default ImageFetcher