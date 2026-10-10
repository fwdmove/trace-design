// Link label that rolls up to a duplicate on hover (pure CSS).
export default function RollText({ children }: { children: string }) {
  return (
    <span className="roll" data-text={children}>
      <span>{children}</span>
    </span>
  )
}
