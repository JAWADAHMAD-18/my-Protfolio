---
id: ahmed
title: Ahmed, AI Voice Receptionist
tags: [project, ai, voice-agent, automation]
---

## Overview
Ahmed is a conversational AI voice agent that handles clinic calls in real time. It answers questions and books appointments using natural speech. The portfolio includes a recording of a demo call.

## How it works
Built with VAPI and ElevenLabs for voice, integrated with n8n and Groq for real-time call handling and appointment booking.

## Stack
VAPI, ElevenLabs, Groq, n8n.

## Details
Project: Ahmed (AI voice agent)
Problem it solves (draft): Handling booking calls by hand is slow and easy to miss. Ahmed answers the call, books the appointment, saves the record and sends the confirmation email automatically.
Hardest technical part (draft, edit if wrong): Making the whole flow reliable end to end, from call to booking to saved record to confirmation email, with no manual step. All automated tests pass.
Solo or team: Solo
Timeline: About 2 days
Supervisor feedback: None
GitHub link: Private (no public repo)
Mobile app link: Not applicable
Architecture: n8n workflow. Incoming call -> conversation -> booking -> save the record -> confirmation email sent automatically