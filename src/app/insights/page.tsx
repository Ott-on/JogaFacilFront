'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import AppHeader from '@/components/shared/AppHeader';
import BottomNav from '@/components/shared/BottomNav';
import { useChat } from '@/context/ChatContext';
import type { ChatMessage } from '@/types/football';

const SUGGESTION_CHIPS = [
  { emoji: '🎯', text: 'Melhor ataque da La Liga' },
  { emoji: '🔥', text: 'Prever jogo do Arsenal hoje' },
  { emoji: '🛡️', text: 'Fraquezas defensivas do City' },
  { emoji: '⚡', text: 'Análise tática do Liverpool' },
];

function formatTime(date: Date): string {
  return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

function UserBubble({ message }: { message: ChatMessage }) {
  return (
    <div className="flex flex-col items-end">
      <div className="bg-[var(--color-primary-container)] text-white px-5 py-3.5 rounded-2xl rounded-tr-none shadow-md max-w-[85%]">
        <p className="text-[0.9375rem] leading-relaxed">{message.content}</p>
      </div>
      <span className="font-label text-[9px] text-[var(--color-on-surface-variant)] mt-1.5 mr-1 uppercase tracking-widest opacity-60">
        {formatTime(message.timestamp)} · Lido
      </span>
    </div>
  );
}

function AIBubble({ message }: { message: ChatMessage }) {
  return (
    <div className="flex flex-col gap-2">
      {/* AI label */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-[var(--color-surface-container-highest)] border border-white/10 flex items-center justify-center">
          <span
            className="material-symbols-outlined text-[14px] text-[var(--color-secondary)]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            auto_awesome
          </span>
        </div>
        <span className="font-label text-[9px] text-[var(--color-on-surface-variant)] uppercase tracking-widest font-semibold">
          Tactical AI
        </span>
      </div>

      {/* Bubble */}
      <div className="ml-10 max-w-[90%]">
        <div className="glass-card border border-white/5 px-5 py-4 rounded-2xl rounded-tl-none shadow-sm">
          <p className="font-label text-[10px] font-bold text-[var(--color-secondary)] uppercase tracking-widest mb-3">
            Análise Tática
          </p>
          <p className="font-body text-sm leading-relaxed text-[var(--color-on-surface-variant)]">
            {message.content}
          </p>
        </div>
        <span className="font-label text-[9px] text-[var(--color-on-surface-variant)] ml-1 mt-1.5 block uppercase tracking-widest opacity-60">
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
}

function LoadingBubble() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-[var(--color-surface-container-highest)] border border-white/10 flex items-center justify-center">
          <span
            className="material-symbols-outlined text-[14px] text-[var(--color-secondary)] animate-pulse"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            auto_awesome
          </span>
        </div>
        <span className="font-label text-[9px] text-[var(--color-on-surface-variant)] uppercase tracking-widest font-semibold">
          Tactical AI
        </span>
      </div>
      <div className="ml-10">
        <div className="glass-card border border-white/5 px-5 py-4 rounded-2xl rounded-tl-none inline-flex items-center gap-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary)] animate-bounce"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function InsightsPage() {
  const { messages, isLoading, send } = useChat();
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const text = input.trim();
    setInput('');
    await send(text);
  };

  const handleChip = async (text: string) => {
    if (isLoading) return;
    await send(text);
    inputRef.current?.focus();
  };

  const hasMessages = messages.length > 0;

  return (
    <>
      {/* Ambient blobs */}
      <div className="ambient-blob-tl" />
      <div className="ambient-blob-br" />

      <AppHeader title="AI INSIGHTS" showAiStatus />

      {/* Full-height scrollable chat area */}
      <main className="fixed inset-0 pt-16 pb-[140px] overflow-y-auto custom-scrollbar z-10">
        <div className="px-4 max-w-lg mx-auto">

          {/* ── Welcome state ───────────────────────────────────── */}
          {!hasMessages && (
            <div className="flex flex-col items-center justify-center pt-14 pb-10 text-center space-y-4">
              {/* Avatar */}
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-[var(--color-surface-container-highest)] flex items-center justify-center border border-white/10 shadow-[0_0_40px_rgba(76,215,246,0.15)]">
                  <span
                    className="material-symbols-outlined text-4xl text-[var(--color-secondary)] glow-secondary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    auto_awesome
                  </span>
                </div>
                {/* Pulse ring */}
                <div className="absolute inset-0 rounded-full border border-[var(--color-secondary)]/20 animate-ping" />
              </div>

              <div className="max-w-[280px]">
                <h2 className="font-headline text-2xl font-bold tracking-tight text-[var(--color-on-surface)]">
                  Tactical AI
                </h2>
                <p className="text-[var(--color-on-surface-variant)] text-sm leading-relaxed mt-2">
                  Olá! Sou seu Tactical AI. Pergunte sobre previsões de partidas, estatísticas de jogadores ou análises de equipes.
                </p>
              </div>
            </div>
          )}

          {/* ── Suggestion chips ────────────────────────────────── */}
          {!hasMessages && (
            <div className="mb-8">
              <div className="flex gap-3 overflow-x-auto custom-scrollbar py-2 px-1">
                {SUGGESTION_CHIPS.map((chip) => (
                  <button
                    key={chip.text}
                    onClick={() => handleChip(chip.text)}
                    disabled={isLoading}
                    className="shrink-0 flex items-center gap-2 px-4 py-2.5 bg-[var(--color-surface-container-high)] border border-white/8 rounded-full text-xs font-medium text-[var(--color-on-surface)] hover:bg-[var(--color-surface-variant)] transition-colors shadow-sm disabled:opacity-50"
                  >
                    <span>{chip.emoji}</span>
                    {chip.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Message thread ──────────────────────────────────── */}
          {hasMessages && (
            <div className="space-y-8 pt-6 pb-4 w-full max-w-2xl mx-auto">
              {/* Suggestion chips (compact, above messages) */}
              {messages.length <= 2 && (
                <div className="flex gap-2 overflow-x-auto custom-scrollbar py-1">
                  {SUGGESTION_CHIPS.slice(0, 2).map((chip) => (
                    <button
                      key={chip.text}
                      onClick={() => handleChip(chip.text)}
                      disabled={isLoading}
                      className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-[var(--color-surface-container-high)] border border-white/8 rounded-full text-[10px] font-medium text-[var(--color-on-surface)] hover:bg-[var(--color-surface-variant)] transition-colors disabled:opacity-50"
                    >
                      <span>{chip.emoji}</span>
                      {chip.text}
                    </button>
                  ))}
                </div>
              )}

              {messages.map((msg) =>
                msg.role === 'user' ? (
                  <UserBubble key={msg.id} message={msg} />
                ) : (
                  <AIBubble key={msg.id} message={msg} />
                )
              )}

              {isLoading && <LoadingBubble />}
              <div ref={bottomRef} />
            </div>
          )}
        </div>
      </main>

      {/* ── Floating input bar ──────────────────────────────── */}
      <div className="fixed bottom-[76px] left-0 w-full px-4 z-40">
        <div className="max-w-lg mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="glass-nav border border-white/10 rounded-full p-1.5 flex items-center shadow-2xl">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Faça sua pergunta tática..."
                disabled={isLoading}
                className="flex-1 bg-transparent border-none outline-none text-[var(--color-on-surface)] placeholder-[var(--color-on-surface-variant)]/40 text-sm px-4 font-body disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 rounded-full bg-[var(--color-secondary)] flex items-center justify-center text-[var(--color-on-secondary)] shadow-[0_0_16px_rgba(76,215,246,0.4)] active:scale-95 transition-all disabled:opacity-40 disabled:shadow-none shrink-0"
                aria-label="Enviar mensagem"
              >
                <span
                  className="material-symbols-outlined text-xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  send
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <BottomNav />
    </>
  );
}
