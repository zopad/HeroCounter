import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as heroesJson from "../../db/heroes.json";
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: "app-hero-counter-search",
  templateUrl: "./hero-counter-search.component.html",
  styleUrls: ["./hero-counter-search.component.scss"]
})
export class HeroCounterSearchComponent implements OnInit {
  constructor(private http: HttpClient) {}

  private heroes: IHeroData[] = [];

  searchControl = new FormControl();
  options: string[] = heroesJson.heroes.map(h => h.localized_name).sort();
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.searchControl.valueChanges.pipe(startWith(''), map(value => this._filter(value)));
    this.searchControl.valueChanges.subscribe(value => {
      const foundHero = heroesJson.heroes.find(h => h.localized_name === value);
      if (foundHero) {
        this.fetchHeroCounters(foundHero.id, 5);
      }
    })
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  private fetchHeroCounters(heroId: number, limit: number) {
    let sortedCounters: IHeroCounterData[];
    this.http
    .get("https://api.opendota.com/api/heroes/" + heroId + "/matchups")
    .subscribe((matchData: IHeroCounterData[]) => {
      sortedCounters = matchData.sort(
        (a, b) => a.wins / a.games_played - b.wins / b.games_played
      );
      this.heroes = [];
      const heroesMap = heroesJson.heroes;
      for (let i = 0; i < limit; i++) {
        const bestIndex = sortedCounters[i].hero_id;
        this.heroes.push({
          localized_name: heroesMap[bestIndex].localized_name,
          url_large_portrait: heroesMap[bestIndex].url_large_portrait
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
