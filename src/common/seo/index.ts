interface Metadata {
    [key: string]: string;
}

export function genAppMetaInfo(defaults: any) {
    const metadata = genMetaInfo({ ...defaults })

    metadata.link.push(...genLink())
    metadata.meta.push(...genMeta())

    return metadata
}

export function genMetaInfo(seo: Metadata) {
    let { title, description, keywords, url } = seo;
    const length = description.length

    const shortDescription = length <= 117
        ? description
        : `${description.slice(0, 116)}...`

    const options = {
        ...seo,
        description: shortDescription,
        keywords,
        title,
    }

    return {
        link: [],
        meta: [

            { vmid: 'title', name: 'title', content: title },
            { vmid: 'description', name: 'description', content: description },
            { vmid: 'keywords', name: 'keywords', content: keywords },
            { vmid: 'uri', name: 'uri', content: url },
            // ...genFacebookMetaInfo(options),
            ...genOpenGraphMetaInfo(options),
            ...genTwitterMetaInfo(options),
        ]
    }
}


export function genFacebookMetaInfo(args) {
    return parseMeta('fb', { app_id: '542948969434243' })
}

export function genLink() {
    const rels = ['preconnect', 'dns-prefetch']
    const hrefs = [
        // 'https://api.cosmicjs.com/',
        // 'https://cdn.carbonads.com/',
        // 'https://srv.carbonads.net/',
        'https://www.google-analytics.com/',
        'https://www.googletagservices.com',
        'https://www.googletagmanager.com',
        // '//a.teads.tv',
        // '//config.seedtag.com',
        // 'https://cdn.ampproject.org',
        // 'https://tags.crwdcntrl.net',
        // 'https://bcp.crwdcntrl.net'
    ]
    const link = [
        {
            "rel": "manifest",
            "href": "/manifest.json"
        },
    ]

    for (const rel of rels) {
        for (const href of hrefs) {
            link.push({ rel, href })
        }
    }
    return link
}


export function genMeta() {
    return [
        { charset: 'utf-8' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1, maximum-scale=5, minimal-ui',
        },
        {
            "content": "320",
            "name": "MobileOptimized"
        },
        {
            "content": "True",
            "name": "HandheldFriendly"
        },
        {
            "content": "Recreando Dev",
            "name": "author"
        },
        {
            "content": "Recreando Dev",
            "name": "generator"
        },
        {
            "content": "es_MX",
            "property": "og:locale"
        },
        {
            "name": "robots",
            "content": "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        }
    ]
}

export function genOpenGraphMetaInfo(args: Metadata) {
    return parseMeta('og', {
        description: args.description,
        image: args.image,
        'image:alt': args.title,
        site_name: 'Recreando',
        title: args.title,
        type: 'website',// article
        "url": args.url
    })
}

export function genTwitterMetaInfo(args: Metadata) {
    return parseMeta('twitter', {
        card: args.image,
        domain: 'https://recreando.dev',
        site: 'Recreando',
        "image:alt": args.title,
        "description": args.description,
        "image": args.image,
        "title": args.title,
    })
}
export function parseMeta(
    prefix,
    metadata,
) {
    const meta = []

    for (const key in metadata) {
        const content = metadata[key]
        const property = `${prefix}:${key}`

        meta.push({
            vmid: property,
            property,
            content,
        })
    }

    return meta
}