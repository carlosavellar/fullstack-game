import { useCallback, useEffect, useState } from 'react';
import axios from "axios";

import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/hooks';
import { MonsterBattleCard } from '../../components/monster-battle-card/MonsterBattleCard';
import { MonstersList } from '../../components/monsters-list/MonstersList';
import { Title } from '../../components/title/Title';
import { fetchMonstersData } from '../../reducers/monsters/monsters.actions';
import {
  selectMonsters,
  selectSelectedMonster,
} from '../../reducers/monsters/monsters.selectors';
import {
  BattleSection,
  PageContainer,
  StartBattleButton,
} from './BattleOfMonsters.styled';
import { Monster } from '../../models/interfaces/monster.interface';

const BattleOfMonsters = () => {
  const [computerMonster, setComputerMonster] = useState<Monster | undefined>({
    id: '' || undefined,
    name: '',
    attack: 0,
    defense: 0,
    hp: 0,
    speed: 0,
    type: '',
    imageUrl: '',
  });
  const [monsterBatle, setMonsterBattle] = useState<object>({
    monster1Id: "",
    monster2Id: ""
  });

  const dispatch = useAppDispatch();

  const monsters = useSelector(selectMonsters);
  const selectedMonster = useSelector(selectSelectedMonster);

  useEffect(() => {
    dispatch(fetchMonstersData());
  }, []);

  const handleMonsterComputer =()=> {

    let monsterComputer: Monster | undefined = {
      id: computerMonster?.id || undefined,
      name: computerMonster?.name || undefined,
      attack:computerMonster?.attack || undefined,
      defense:computerMonster?.defense || undefined,
      hp:computerMonster?.hp || undefined,
      speed:computerMonster?.speed || undefined,
      type: computerMonster?.type || undefined,
      imageUrl: computerMonster?.imageUrl || undefined,
    };
    monsterComputer = monsters.find((monster) => {
      let currentMonsterComputer = monsterComputer
      if(monster.id !== selectedMonster?.id){
        currentMonsterComputer = monster
      } 
      if(monster?.id !== monsterComputer?.id){
        currentMonsterComputer = monster
      }
      if(monsterComputer?.id !== currentMonsterComputer?.id){
        setComputerMonster(currentMonsterComputer);
      } 
    });
  };

  const handleStartBattleClick = () => {
    // Fight!
     axios.post('http://localhost:3001/battle', {monster1Id: selectedMonster?.id, monster2Id: computerMonster?.id})
    .then(response=>{
      alert(response.data.winner.name)
    })
    .catch(error=>{
      console.log(error)
    })
  };

  useEffect(() => {
    if (selectedMonster !== null) {
      console.log('selected');
      handleMonsterComputer();
    }
  }, [selectedMonster]);

  return (
    <PageContainer>
      <Title>Battle of Monsters</Title>

      <MonstersList monsters={monsters} />

      <BattleSection>
        <MonsterBattleCard
          title={selectedMonster?.name || 'Player'}
          attack={selectedMonster?.attack || 0}
          defense={selectedMonster?.defense || 0}
          hp={selectedMonster?.hp || 0}
          speed={selectedMonster?.speed || 0}></MonsterBattleCard>
        <StartBattleButton
          data-testid="start-battle-button"
          disabled={selectedMonster === null}
          onClick={() => {
            handleStartBattleClick();
          }}>
          Start Battle
        </StartBattleButton>
        <MonsterBattleCard
          title={computerMonster?.name || 'Computer'}
          attack={computerMonster?.attack || 0}
          defense={computerMonster?.defense || 0}
          hp={computerMonster?.hp || 0}
          speed={computerMonster?.speed || 0}></MonsterBattleCard>
      </BattleSection>
    </PageContainer>
  );
};

export { BattleOfMonsters };
