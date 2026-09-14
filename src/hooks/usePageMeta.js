import { useEffect } from 'react';
import {
    applySeoMetadata,
    DEFAULT_DESCRIPTION,
    DEFAULT_OG_IMAGE,
    DEFAULT_TITLE,
    stripHtml,
} from '../utils/seo';

// Cache all page metas in memory to avoid repeated fetching of the full list
let allPageMetasCache = null;
let allPageMetasPromise = null;

export function usePageMeta(slug) {
    useEffect(() => {
        if (!slug) return;

        const applyMetaData = (data) => {
            if (!data) return;
            const metaTitle =
                data.metaTitle ||
                data.meta_title ||
                data.title ||
                data.meta?.title ||
                data.seo?.meta_title ||
                data.seo?.metaTitle;
            const metaDesc =
                data.metaDesc ||
                data.meta_desc ||
                data.description ||
                data.meta?.description ||
                data.seo?.meta_desc ||
                data.seo?.metaDesc;
            const metaKeyword =
                data.metaKeyword ||
                data.meta_keyword ||
                data.keywords ||
                data.meta?.keywords ||
                data.seo?.meta_keyword ||
                data.seo?.metaKeyword;
            const metaImage =
                data.metaImage ||
                data.meta_image ||
                data.ogImage ||
                data.og_image ||
                data.image ||
                data.image_url ||
                data.banner_image ||
                data.thumbnail ||
                data.meta?.image ||
                data.seo?.meta_image ||
                data.seo?.metaImage;
            const modifiedTime =
                data.modified_time ||
                data.modifiedTime ||
                data.updated_at ||
                data.updatedAt ||
                data.created_at ||
                data.createdAt;
            const cleanDescription = stripHtml(metaDesc || '') || DEFAULT_DESCRIPTION;

            applySeoMetadata({
                title: metaTitle || DEFAULT_TITLE,
                description: cleanDescription,
                keywords: metaKeyword || '',
                canonicalUrl: window.location.href,
                ogTitle: metaTitle || DEFAULT_TITLE,
                ogDescription: cleanDescription,
                ogImage: metaImage || DEFAULT_OG_IMAGE,
                ogUrl: window.location.href,
                ogType: 'website',
                articleModifiedTime: modifiedTime || document.lastModified,
                msTileImage: metaImage || DEFAULT_OG_IMAGE,
            });
        };

        if (slug.includes('/')) {
            // Slug contains a slash (e.g. US city page), fetch all page metas (with cache) and search
            if (allPageMetasCache) {
                const matched = allPageMetasCache.find(item => item.slug === slug);
                if (matched) {
                    applyMetaData(matched);
                }
            } else {
                if (!allPageMetasPromise) {
                    allPageMetasPromise = fetch('https://cms.clickmecha.com/api/page-meta')
                        .then(res => res.json())
                        .then(response => {
                            if (response.status && Array.isArray(response.data)) {
                                allPageMetasCache = response.data;
                                return response.data;
                            }
                            return [];
                        })
                        .catch(err => {
                            console.error('Failed to fetch all page metas:', err);
                            allPageMetasPromise = null; // reset on error so it can retry
                            return [];
                        });
                }
                allPageMetasPromise.then(list => {
                    const matched = list.find(item => item.slug === slug);
                    if (matched) {
                        applyMetaData(matched);
                    }
                });
            }
        } else {
            // Fetch single page meta (for slugs without a slash)
            fetch(`https://cms.clickmecha.com/api/page-meta/${slug}`)
                .then(res => res.json())
                .then(response => {
                    if (response.status && response.data) {
                        applyMetaData(response.data);
                    }
                })
                .catch(err => console.error('Failed to fetch page meta:', err));
        }
    }, [slug]);
}
