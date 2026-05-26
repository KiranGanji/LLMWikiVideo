# LLM Wiki Video

This project is a Remotion video for the UHG LLM Wiki explainer.

## Run Remotion Studio

```bash
npm run dev
```

This starts Remotion Studio for local preview.

## Render MP4

```bash
npm run render
```

This renders the final video to:

```text
out/llm-wiki-explainer.mp4
```

## Render Specific Frames

Render only a frame range:

```bash
npm run render -- --frames=780-1020
```

Render from a frame to the end:

```bash
npm run render -- --frames=780-
```

Render a single frame:

```bash
npm run render -- --frames=780
```

## Render With Muted Audio

Render the video without audio:

```bash
npm run render -- --muted
```

Render a specific frame range without audio:

```bash
npm run render -- --frames=780-1020 --muted
```
