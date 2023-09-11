import { useEffect } from 'react';
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
  const [computerMonster, setComputerMonster] = useState<{}>();
  const dispatch = useAppDispatch();

  const monsters = useSelector(selectMonsters);
  const selectedMonster = useSelector(selectSelectedMonster);

  useEffect(() => {
    dispatch(fetchMonstersData());
  }, []);

  const handleMonsterComputer = () => {
    debugger;
    let monsterComputer = {};
    monsters.some((monster) => {
      if (selectedMonster?.id !== monster.id) {
        monsterComputer = {
          title: monster.name,
          attack: monster.attack,
          defense: monster.defense,
          hp: monster.hp,
          speed: monster.speed,
        };
      }
    });
    setComputerMonster(monsterComputer);
  };

  const handleStartBattleClick = () => {
    // Fight!
  };

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
            handleMonsterComputer();
          }}>
          Start Battle
        </StartBattleButton>
        <MonsterBattleCard
          title="Computer"
          attack={0}
          defense={0}
          hp={0}
          speed={0}></MonsterBattleCard>
      </BattleSection>
    </PageContainer>
  );
};

export { BattleOfMonsters };
function useState<T>() {
  throw new Error('Function not implemented.');
}
