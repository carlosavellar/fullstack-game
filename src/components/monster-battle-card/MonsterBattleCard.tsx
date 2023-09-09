import { Monster } from '../../models/interfaces/monster.interface';
import {
  BattleMonsterCard,
  BattleMonsterTitle,
} from './MonsterBattleCard.styled';

type MonsterCardProps = {
  monster?: Monster | null;
  title?: string;
  attack: number;
  defense: number;
  hp: number;
  speed: number;
};

const MonsterBattleCard: React.FC<MonsterCardProps> = ({
  title,
  attack,
  defense,
  hp,
  speed,
}) => {
  return (
    <BattleMonsterCard centralized>
      <BattleMonsterTitle>
        {title!}
        <div>{attack!}</div>
        <div>{defense!}</div>
        <div>{hp!}</div>
        <div>{speed!}</div>
      </BattleMonsterTitle>
    </BattleMonsterCard>
  );
};

export { MonsterBattleCard };
