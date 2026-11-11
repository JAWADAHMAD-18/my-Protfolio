---
id: hisab-kitab
title: Hisab Kitab
tags: [project, web, ai, finance]
---

## Overview
Hisab Kitab is an AI-powered personal finance tracker with monthly income and expense tracking, WhatsApp voice-note logging and LLM-generated narrative email reports. Live: https://hissab-kitab-eosin.vercel.app/

## Stack
Next.js, TypeScript, MongoDB, NextAuth.js, Tailwind CSS, Framer Motion, Groq.

## Details
Project: Hisab Kitab
Problem it solves: Most budgeting apps are complicated. Hisab Kitab is built around one idea, "ek paycheck, ek mahina": track what is left of this month's money. Logging is easy by voice or WhatsApp, including in Urdu, Roman Urdu or English.
Hardest technical part: A deprecated LLM model started returning 404s and broke voice entry, WhatsApp and reports at once. Fixed by moving all model names into one config with an env override and a fallback model. Also: accurate voice entry from mixed Urdu / Roman Urdu / English speech.
Solo or team: Solo, end to end
Timeline: About 2 weeks to build end to end; updates and patches continue
Supervisor feedback: None (do not reuse Dr. Akmal's quote here, it is about TripFusion)
GitHub link: https://github.com/JAWADAHMAD-18/Hissab_Kitab
Mobile app link: Installable PWA today. Native mobile app coming soon. No store link.
Stack: Next.js + TypeScript, MongoDB Atlas, NextAuth, Tailwind, Framer Motion, Recharts, Groq (Whisper + LLM), Brevo, WhatsApp Cloud API, Vercel.
