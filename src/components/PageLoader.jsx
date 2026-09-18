import logoMark from '../assets/algo.png'
import './PageLoader.css'

/** Branded first-load screen shown while the single-page app initializes. */
export default function PageLoader() {
  return <div className="page-loader" role="status" aria-label="Loading Algotricz"><div className="page-loader__content"><img src={logoMark} alt="" /><p>Algotricz</p><span>Building what&apos;s next</span></div><div className="page-loader__progress"><i /></div><small>Loading experience</small></div>
}
