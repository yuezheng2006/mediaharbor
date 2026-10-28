import { describe, expect, it } from 'vitest';
import { detectPlatform } from './platform-data';
import { splitDownloadLinks } from './download-links';

describe('download links', () => {
  it('splits pasted links by newline or comma without changing queue order', () => {
    expect(
      splitDownloadLinks(
        ' https://www.youtube.com/watch?v=one\nhttps://www.bilibili.com/video/BV1xx, https://v.douyin.com/abc/ '
      )
    ).toEqual([
      'https://www.youtube.com/watch?v=one',
      'https://www.bilibili.com/video/BV1xx',
      'https://v.douyin.com/abc/',
    ]);
  });

  it('routes Chinese and social video sites through the generic yt-dlp path', () => {
    const genericUrls = [
      'https://www.bilibili.com/video/BV1xx',
      'https://v.douyin.com/abc/',
      'https://x.com/mediaharbor/status/123',
      'https://channels.weixin.qq.com/web/pages/show?finderFeedId=abc',
    ];

    expect(genericUrls.map(detectPlatform)).toEqual(['generic', 'generic', 'generic', 'generic']);
  });

  it('returns no entries for blank input', () => {
    expect(splitDownloadLinks('  \n,  ')).toEqual([]);
  });
});
