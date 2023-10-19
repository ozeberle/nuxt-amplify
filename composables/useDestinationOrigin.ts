export default function (name: string) {
  const paths = /(-a-|-to-)+/g

  const od = name.split(paths)
  const result = { origin: '', destination: '' }
  if (od.length > 0) {
    const o = od[0].split('-')
    result.origin = o.splice(1, o.length - 1).join(' ')
    const d = od[2].split('-')
    result.destination = d.splice(0, o.length).join(' ')
  }

  return result
}
