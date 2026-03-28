---
name: create-blog-post
description: Workflow for creating and formatting blog posts. Use when asked to write or add a new blog post, project update, or mini-project entry.
---

# Gerrysworld Blog Post Skill

This skill provides a standardized workflow for adding new blog posts to the Gerry's World website.

## Workflow

1.  **Gather Information**: Ensure you have the title, a brief description, and the content/link for the post.
2.  **Generate Slug**: Create a URL-friendly slug from the title (lowercase, hyphens instead of spaces).
3.  **Determine Date**: Use today's date in `YYYY-MM-DD` format for the filename and `Month DD, YYYY` for the front matter.
4.  **Create File**: Create a new file in `_blog/` named `YYYY-MM-DD_slug.md`.
5.  **Apply Front Matter**: Use the template below to fill in the metadata.
6.  **Write Content**: Add the post content below the front matter.

## Front Matter Template

```yaml
---
title: "Post Title"
postType: "miniproject"  # Options: miniproject, tutorial, project
description: "A short summary of the post."
date: Mar 28, 2026
tags:
  - tag1
  - tag2
---
```

## Guidelines

- **File Name**: `YYYY-MM-DD_slug.md` (e.g., `2026-03-28_dyson_wall_mount.md`).
- **Post Type**: Default to `miniproject` for quick updates or small builds. Use `tutorial` for how-to guides.
- **Date Format**:
    - Filename: `2026-03-28`
    - Front matter: `Mar 28, 2026`
- **Directory**: Always save to the `_blog/` directory.
- **Images**: If images are provided, place them in `_blog/images/` or a post-specific subdirectory if appropriate.
