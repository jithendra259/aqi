
import StatisticCard from "@/components/home-cards"
import Home_herocard from "@/components/home-herocard"
import { FileTriggerButton } from "@/components/ui/file-trigger";


export default function Home(){
  return (
    <div className="p-10">
      <Home_herocard/>
      <StatisticCard />
      <FileTriggerButton/>
    </div>
  )
}