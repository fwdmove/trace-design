// A desktop-style window: glossy title bar with three buttons, then content.
export default function Window({
  title,
  children,
  className = '',
  ...rest
}: {
  title: string
  children: React.ReactNode
  className?: string
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`win ${className}`} {...rest}>
      <div className="win-bar">
        <span className="win-dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="win-title">{title}</span>
        <span className="win-grip" aria-hidden="true" />
      </div>
      <div className="win-body">{children}</div>
    </div>
  )
}
