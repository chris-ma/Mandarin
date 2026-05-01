'use client'

interface MicButtonProps {
  isListening: boolean
  isSupported: boolean
  /** Tap-to-toggle mode (ConversationPhase) */
  onClick?: () => void
  /** Hold-to-record mode (PhrasePhase) — both must be provided together */
  onPressStart?: () => void
  onPressEnd?: () => void
  size?: 'sm' | 'lg'
}

export default function MicButton({
  isListening,
  isSupported,
  onClick,
  onPressStart,
  onPressEnd,
  size = 'lg',
}: MicButtonProps) {
  const dim = size === 'lg' ? 'w-20 h-20' : 'w-14 h-14'
  const iconSize = size === 'lg' ? 'text-3xl' : 'text-xl'
  const holdMode = onPressStart !== undefined && onPressEnd !== undefined

  if (!isSupported) {
    return (
      <div className={`${dim} rounded-full bg-gray-200 flex items-center justify-center`}>
        <span className="text-gray-400 text-sm text-center px-2">No mic</span>
      </div>
    )
  }

  const ringSize1 = size === 'lg' ? 96 : 64
  const ringSize2 = size === 'lg' ? 120 : 80

  return (
    <div className="relative flex items-center justify-center">
      {isListening && (
        <>
          <div
            className="absolute rounded-full opacity-30 animate-ping"
            style={{ width: ringSize1, height: ringSize1, background: 'var(--crimson)' }}
          />
          <div
            className="absolute rounded-full opacity-20 animate-ping"
            style={{ width: ringSize2, height: ringSize2, background: 'var(--crimson)', animationDelay: '0.3s' }}
          />
        </>
      )}
      <button
        /* Hold-to-record: use pointer capture so release always fires even if finger drifts off */
        onPointerDown={holdMode ? (e) => {
          e.currentTarget.setPointerCapture(e.pointerId)
          e.preventDefault()
          onPressStart!()
        } : undefined}
        onPointerUp={holdMode ? (e) => {
          e.currentTarget.releasePointerCapture(e.pointerId)
          onPressEnd!()
        } : undefined}
        onPointerCancel={holdMode ? () => onPressEnd!() : undefined}
        /* Tap-to-toggle mode */
        onClick={!holdMode ? onClick : undefined}
        className={`relative ${dim} rounded-full flex items-center justify-center shadow-lg transition-all active:scale-95 ${
          isListening ? 'scale-105' : 'hover:scale-105'
        }`}
        style={{
          background: isListening ? 'var(--crimson)' : 'var(--crimson-mid)',
          touchAction: holdMode ? 'none' : 'auto',
          userSelect: 'none',
          WebkitUserSelect: 'none',
        }}
        aria-label={isListening ? 'Release to submit' : holdMode ? 'Hold to record' : 'Start recording'}
      >
        <span className={iconSize}>{isListening ? '⏹️' : '🎙️'}</span>
      </button>
    </div>
  )
}
