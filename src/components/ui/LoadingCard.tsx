/** 資料載入中的佔位，避免一開始閃過「還沒有紀錄」 */
export default function LoadingCard() {
  return (
    <div className="rounded-2xl border border-line bg-card px-5 py-8 text-center text-sm text-steel" role="status">
      載入中…
    </div>
  )
}
