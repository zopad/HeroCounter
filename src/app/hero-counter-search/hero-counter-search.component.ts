import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as heroesJson from "../../db/heroes.json";

@Component({
  selector: "app-hero-counter-search",
  templateUrl: "./hero-counter-search.component.html",
  styleUrls: ["./hero-counter-search.component.scss"]
})
export class HeroCounterSearchComponent implements OnInit {
  constructor(private http: HttpClient) {}

  private heroes: IHeroData[] = [];

  ngOnInit() {
    let sortedCounters: IHeroCounterData[];
    this.http
      .get("https://api.opendota.com/api/heroes/1/matchups")
      .subscribe((matchData: IHeroCounterData[]) => {
        sortedCounters = matchData.sort(
          (a, b) => a.wins / a.games_played - b.wins / b.games_played
        );
        for (let i = 0; i < 5; i++) {
          const bestIndex = sortedCounters[i].hero_id;
          this.heroes.push({
            localized_name: heroesJson.heroes[bestIndex].localized_name,
            url_large_portrait: heroesJson.heroes[bestIndex].url_large_portrait
          });
        }
      });
  }
}

interface IHeroCounterData {
  games_played: number;
  hero_id: number;
  wins: number;
}

interface IHeroData {
  localized_name: string;
  url_large_portrait: string;
}
