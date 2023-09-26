/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { 
	useBlockProps, 
	__experimentalLinkControl as LinkControl,
	BlockControls,
	InspectorControls 
} from '@wordpress/block-editor';

import { 
	RangeControl,
	ToolbarGroup,
	ToolbarDropdownMenu,
} from '@wordpress/components';

const DOMAIN_INFO = {
	'instagram.com': { siteslug: 'instagram', name: 'Instagram' },
	'github.com': { siteslug: 'github', name: 'Github' },
	'linkedin.com': { siteslug: 'linkedin', name: 'LinkedIn' },
	'facebook.com': { siteslug: 'facebook', name: 'Facebook' },
	'twitter.com': { siteslug: 'x', name: 'Twitter' },
	'x.com': { siteslug: 'x', name: 'X' },
	'youtube.com': { siteslug: 'youtube', name: 'YouTube' },
	'pinterest.com': { siteslug: 'pinterest', name: 'Pinterest' },
	'snapchat.com': { siteslug: 'snapchat', name: 'Snapchat' },
	'reddit.com': { siteslug: 'reddit', name: 'Reddit' },
	'tumblr.com': { siteslug: 'tumblr', name: 'Tumblr' },
	'spotify.com': { siteslug: 'spotify', name: 'Spotify' },
	'whatsapp.com': { siteslug: 'whatsapp', name: 'WhatsApp' },
	'vimeo.com': { siteslug: 'vimeo', name: 'Vimeo' },
	'discord.com': { siteslug: 'discord', name: 'Discord' },
	'slack.com': { siteslug: 'slack', name: 'Slack' },
	'twitch.tv': { siteslug: 'twitch', name: 'Twitch' },
	'soundcloud.com': { siteslug: 'soundcloud', name: 'SoundCloud' },
	'medium.com': { siteslug: 'medium', name: 'Medium' },
	'inaturalist.org': { siteslug: 'inaturalist', name: 'iNaturalist'}, 
	'onlyfans.com': { siteslug: 'onlyfans', name: 'OnlyFans'},
	'patreon.com': { siteslug: 'patreon', name: 'Patreon'},
	'buymeacoffee.com': { siteslug: 'bmc', name: 'Buy Me a Coffee'},
	'vsco.co': { siteslug: 'vsco', name: 'VSCO'}
};

function getDomain(url) {
	try {
	if (!url.match(/^http:\/\/|https:\/\//)) {
		url = 'https://' + url;
	}

	  const urlObj = new URL(url);
	  return urlObj.hostname.replace('www.', '');
	} catch (e) {
	  console.error('Invalid URL', e);
	  return null;
	}
}

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const { 
		link, 
		iconSlug,
		size, 
		siteName,
		colorScheme,
	} = attributes;

	function updateLink(newLink) {
		if (!newLink) return;
		
		const { url, openInNewTab } = newLink;

		setAttributes({ link: { url, openInNewTab } });

		const domain = getDomain(url);
		if (domain && DOMAIN_INFO[domain]) {
			const { siteslug, name } = DOMAIN_INFO[domain];
			setAttributes({ 
				iconSlug: siteslug,
				siteName: name
			});
		} else {
			setAttributes({ 
				iconSlug: "invalid",
				siteName: null
			});
		}
	}

	return (
		<div { ...useBlockProps() } style={{ height: `${size}px` }} >
			<BlockControls>
				<LinkControl
					searchInputPlaceholder="Enter link URL..."
					value={ link || "" } 
					onChange={ ( newLink ) => {
						updateLink(newLink); 
					} }
					showInitialSuggestions={false}
				>
				</LinkControl>
				<ToolbarGroup>
					<ToolbarDropdownMenu
						label="Style"
						icon={"admin-customizer"}
						controls={[
							{
								title: 'Color',
								onClick: () => setAttributes({ colorScheme: 'color' }),
							},
							{
								title: 'Dark',
								onClick: () => setAttributes({ colorScheme: 'dark' }),
							},
							{
								title: 'Light',
								onClick: () => setAttributes({ colorScheme: 'light' }),
							},
						]}
					/>
				</ToolbarGroup>
			</BlockControls>
			<InspectorControls>
				<RangeControl
					label="Size"
					value={size}
					onChange={(value) => setAttributes({ size: value })}
					min={25}
					max={200}
				/>
                </InspectorControls>
			<a 
				href={ link.url } 
				title={ siteName }
				target={ link.openInNewTab ? "_blank" : "_self" } 
				rel={ link.openInNewTab ? "noopener noreferrer" : "noopener" }
			>				
				{ 
					(iconSlug == "unset") ? (
						<inline>Enter a supported url...</inline>
					) : (iconSlug == "invalid") ? (
						<inline>Unsupported url...</inline>
					) :	(
						<img src={`${pluginInfo.path}assets/${colorScheme}/${iconSlug}-${colorScheme}.png`} alt={siteName} />
					) 
				}
			</a>
		</div>
	);
}
