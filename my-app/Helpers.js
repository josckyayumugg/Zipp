import { Linking } from "react-native";

export function formatDateTime(date) {
  return new Date(date).toLocaleString("en-GB", {
    day: "2-digit",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function containsContactInfo(text) {
  const patterns = [
    // Email addresses
    /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i,

    // URLs
    /(https?:\/\/|www\.)\S+/i,

    // Phone numbers (7-15 digits with optional separators)
    /(\+?\d[\d\s\-().]{6,}\d)/,

    // @username
    /(^|\s)@[a-zA-Z0-9_.]+/,

    // WhatsApp
    /\bwhatsapp\b/i,

    // Telegram
    /\btelegram\b/i,

    // Instagram
    /\binstagram\b|\binsta\b/i,

    // Facebook
    /\bfacebook\b|\bfb\b/i,

    // Snapchat
    /\bsnap(chat)?\b/i,

    // TikTok
    /\btiktok\b/i,

    // Twitter / X
    /\btwitter\b|\bx\.com\b/i,

    // Discord
    /\bdiscord\b/i,

    // LinkedIn
    /\blinkedin\b/i,
  ];

  return patterns.some((pattern) => pattern.test(text));
}

export function openWebsite(link) {
  Linking.openURL(link);
}

export function getInitials(name) {
  if (!name) return "";

  return name
    .trim()
    .split(/\s+/)
    .map((word) => word[0].toUpperCase())
    .join("");
}
