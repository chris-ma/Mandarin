'use client'

interface MicButtonProps {
  isListening: boolean
  isSupported: boolean
  onClick: () => void
  size?: 'sm' | 'lg'
}

export default function MicButton({ isListening, isSupported, onClick, size = 'lg' }: MicButtonProps) {
  const dim = size === 'lg' ? 'w-20 h-20' : 'w-14 h-14'
  const iconSize = size === 'lg' ? 'text-3xl' : 'text-xl'

  if (!isSupported) {
    return (
      <div className={`${dim} rounded-full bg-gray-200 flex items-center justify-center`}>
        <span className="text-gray-400 text-sm text-center px-2">No mic</span>
      </div>
    )
  }

  return (
    <div className="relative flex items-center justify-center">
      {isListening && (
        <>
          <div
            className="absolute rounded-full opacity-30 animate-ping"
            style={{
              width: size === 'lg' ? '96px' : '64px',
              height: size === 'lg' ? '96px' : '64px',
              background: 'var(--red)',
            }}
          />
          <div
            className="absolute rounded-full opacity-20 animate-ping"
            style={{
              width: size === 'lg' ? '120px' : '80px',
              height: size === 'lg' ? '120px' : '80px',
              background: 'var(--red)',
              animationDelay: '0.3s',
            }}
          />
        </>
      )}
      <button
        onClick={onClick}
        className={`relative ${dim} rounded-full flex items-center justify-center shadow-lg transition-all active:scale-95 ${
          isListening ? 'scale-105' : 'hover:scale-105'
        }`}
        style={{
          background: isListening
            ? 'var(--red-dark)'
            : 'var(--red)',
        }}
        aria-label={isListening ? 'Stop recording' : 'Start recording'}
      >
        <span className={iconSize}>{isListening ? '⏹️' : '🎙️'}</span>
      </button>
    </div>
  )
}
