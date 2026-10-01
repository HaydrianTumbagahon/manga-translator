# MangaTranslator

MangaTranslator is a browser-based manga page translation project built as a way to practice frontend development and explore AI-assisted translation workflows. I built it with help from AI tools and use the project to learn, test ideas, and improve the experience over time. It is a work in progress, not a polished or production translation service.

## Current features

- Translate image pages with Google Gemini, xAI Grok, or OpenAI-compatible vision models using your own API key.
- Choose a source language (auto-detect, Japanese, English, or Korean) and a target language (English, Japanese, Spanish, or French).
- Select or drag in JPG, JPEG, PNG, and WebP images; multiple images are processed one after another.
- Preview and download translated images. The app asks the selected model to identify text regions and return structured translations, then renders those translations on a canvas in the browser.
- Check the current session's translation status and download completed pages.

ZIP and CBZ files appear in the file picker, but archive extraction is not implemented yet. Only image files can currently be translated. Translation history is held in page memory and is not persisted between reloads. The reading-direction setting is present in the interface, but does not yet change the translation or rendering behavior.

## Technology

- React 18 for the interface
- Vite for development and production builds
- Tailwind CSS for styling
- Ant Design and React Icons for interface components and icons
- i18next and react-i18next for localization
- Browser Canvas and the Fetch API for image rendering and provider requests

## Getting started

Requirements: Node.js and npm.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. To create and preview a production build:

```sh
npm run build
npm run preview
```

## Using translation

1. Open the translation page and its AI settings.
2. Choose Gemini, Grok, or OpenAI, then provide an API key and a model supported by that provider. Test the key from settings.
3. Select the source and target languages, add one or more image pages, and start translation.
4. Review the generated page and download the result.

Provider model availability, account requirements, rate limits, and pricing are controlled by each provider and can change. The app's default model identifiers may need to be updated when provider APIs change. Requests are made directly from the browser to the selected provider, so the provider must allow browser requests from the app's origin (CORS).

## Privacy and API keys

This project has no application server or server-side translation proxy. When translation runs, the selected image and prompt are sent from your browser directly to the provider you chose, under that provider's API terms and privacy policy. Do not translate content unless you have the rights and permission to do so.

Provider API keys and model selections are stored in this browser's `localStorage` for convenience. They are not protected by a backend secret store. Avoid using this on a shared or untrusted device, and clear the site's local storage to remove saved keys. The provider receives the API key along with its request. Review the provider's data handling and billing terms before use.

## Translation quality and limitations

AI-generated text, OCR, language detection, and region coordinates can be wrong or incomplete. Results depend on image quality, typography, text direction, context, and the model. Always review translations, especially names, honorifics, jokes, sound effects, and text that carries story-critical meaning.

The current renderer is an early prototype: it covers each detected text region with a sampled background color and draws translated text into the region. It does not perform image inpainting or reliably reconstruct artwork behind the original text. Complex backgrounds, overlapping text, vertical writing, small bubbles, and long translations may need manual cleanup. The reading-direction control is not yet connected to rendering.

This tool is for experimentation and practice. It does not guarantee translation accuracy, preserve original lettering, or replace professional translation and typesetting review.

## Planned improvements

The roadmap is exploratory and may change. Priorities for polishing translations include:

- Improve text detection and region boundaries, then validate and recover gracefully from incomplete model responses.
- Add editable translations so a reader can fix wording and region placement before export.
- Improve bubble cleanup, background reconstruction, line breaks, font sizing, and support for vertical text and sound effects.
- Add glossary and character-name controls to preserve terminology and voice across pages.
- Support ZIP/CBZ extraction and improve multi-page organization and progress feedback.
- Add focused automated tests and a repeatable set of sample pages for checking translation and rendering quality.
- Review key storage and provider-request security as the project architecture grows.

## Project status

This repository is a learning project under active development. Features, provider APIs, and model IDs may change. Check the repository for a license before reusing or redistributing the code.