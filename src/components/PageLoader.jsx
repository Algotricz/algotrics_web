import logoMark from '../assets/algo.png'
import '../styles/PageLoader.css'

export default function PageLoader() {
  return <div className="page-loader" role="status" aria-label="Loading Algotricz"><div className="page-loader__content"><img src={logoMark} alt="" /><p>Algotricz</p><span>Building what&apos;s next</span></div><div className="page-loader__progress"><i /></div><small>Loading experience</small></div>
}
