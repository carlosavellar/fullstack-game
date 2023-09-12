import { useCallback, useEffect, useState } from 'react';
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
  const [computerMonster, setComputerMonster] = useState<Monster | undefined>();
  const [playerNewMonster, setPlayerNewMonster] = useState<Monster>();

  const dispatch = useAppDispatch();

  const monsters = useSelector(selectMonsters);
  const selectedMonster = useSelector(selectSelectedMonster);

  useEffect(() => {
    dispatch(fetchMonstersData());
  }, []);

  const handleMonsterComputer = useCallback(() => {
    debugger;
    let monsterComputer: Monster | undefined = {
      id: '',
      name: '',
      attack: 0,
      defense: 0,
      hp: 0,
      speed: 0,
      type: '',
      imageUrl: '',
    };
    monsters.some((monster) => {
      if (
        selectedMonster?.id !== monster.id &&
        computerMonster?.id !== selectedMonster?.id
      ) {
        monsterComputer = {
          ...monster,
        };
      }
    });
    setComputerMonster(monsterComputer);
  }, []);

  const handleStartBattleClick = () => {
    // Fight!
  };

  useEffect(() => {
    console.log(selectedMonster);
    if (selectedMonster !== null) {
      console.log('selected');
      handleMonsterComputer();
    }
  }, [selectedMonster, handleMonsterComputer]);

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
