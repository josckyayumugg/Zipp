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

export function getYear(date) {
  if (!date) return "";
  return new Date(date).getFullYear().toString();
}

// utils/formatters.js
export function formatRwandanPhone(phone) {
  if (!phone) return "";

  // 1. Keep only digits
  const cleaned = ("" + phone).replace(/\D/g, "");

  // 2. Format 10-digit local number (e.g. 0780000000 -> 0780 000 000)
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  }

  return phone;
}

export function formatPhone(phone, style = "international") {
  if (!phone) return "";

  // Step 1: Strip out all non-digits
  let digits = ("" + phone).replace(/\D/g, "");

  // Step 2: Normalize to a 9-digit national subscriber number (e.g. "784450897")
  if (digits.length === 12 && digits.startsWith("250")) {
    digits = digits.slice(3); // Remove "250"
  } else if (digits.length === 10 && digits.startsWith("0")) {
    digits = digits.slice(1); // Remove leading "0"
  }

  // If the number is incomplete or doesn't match a standard 9-digit national length
  if (digits.length !== 9) {
    return phone; // Return as-is if malformed
  }

  // Step 3: Extract blocks (e.g., "784", "450", "897")
  const carrier = digits.slice(0, 3);
  const group1 = digits.slice(3, 6);
  const group2 = digits.slice(6);

  // Step 4: Format output
  if (style === "local") {
    // Returns: "0784 450 897"
    return `0${carrier} ${group1} ${group2}`;
  }

  // Returns: "+250 784 450 897" (Default)
  return `+250 ${carrier} ${group1} ${group2}`;
}

/**
 * Transforms ANY phone number into WhatsApp standard digits (no +, no spaces).
 * Defaults to country code 250 (Rwanda) if no country code is attached.
 */
export function toWhatsAppDigits(phone) {
  if (!phone) return "";

  // 1. Strip ALL non-digit characters (+, spaces, dashes, parentheses)
  let digits = ("" + phone).replace(/\D/g, "");

  if (!digits) return "";

  // 2. Handle local Rwandan numbers starting with '07...' (e.g., "0784450897" -> 10 digits)
  if (digits.length === 10 && digits.startsWith("0")) {
    return `250${digits.slice(1)}`;
  }

  // 3. Handle 9-digit national subscriber numbers (e.g., "784450897")
  if (digits.length === 9) {
    return `250${digits}`;
  }

  // 4. Return pure digits as-is (+250784450897 -> "250784450897", +254780870070 -> "254780870070")
  return digits;
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

/**

 */
export function getTimeRemaining(createdAt) {
  if (!createdAt) {
    return { remainingText: "Expired", isExpired: true, hours: 0, minutes: 0 };
  }

  const createdTime = new Date(createdAt).getTime();
  const now = new Date().getTime();

  // 24 hours in milliseconds (24 * 60 * 60 * 1000)
  const TWENTY_FOUR_HOURS_MS = 86400000;
  const expirationTime = createdTime + TWENTY_FOUR_HOURS_MS;
  const timeDifference = expirationTime - now;

  // If time has passed 24 hours
  if (timeDifference <= 0) {
    return {
      remainingText: "Expired",
      isExpired: true,
      hours: 0,
      minutes: 0,
    };
  }

  // Calculate remaining hours and minutes
  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

  // Format nice readable strings like "18h 45m remaining" or "45m remaining"
  let remainingText = "";
  if (hours > 0) {
    remainingText = `${hours}h ${minutes}m left`;
  } else {
    remainingText = `${minutes}m left`;
  }

  return {
    remainingText,
    isExpired: false,
    hours,
    minutes,
  };
}

export function formatNumber(amount) {
  // 1. Guard against empty / null / undefined inputs
  if (amount === undefined || amount === null || amount === "") return "0";

  // 2. Convert to string safely
  const rawString = String(amount).trim();
  if (!rawString) return "0";

  // 3. Remove existing commas, spaces, or currency symbols
  const cleanString = rawString.replace(/[^0-9.-]+/g, "");

  // 4. Parse to number
  const numericAmount = Number(cleanString);

  // 5. If it's not a valid number, safely return "0"
  if (isNaN(numericAmount)) return "0";

  // 6. Format with commas
  return numericAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
