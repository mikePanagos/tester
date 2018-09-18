public class Attack {

    Terrirory terrirory1 = new Territory();
    Terrirory terrirory2 = new Territory();

    int a = Terrirory1.getUnits();
    int attackingNumOfRolls = 0 ;

    if(a<3)
    {
        attackingNumOfRolls = 3;
    }else if(a==2)
    {
        attackingNumOfRolls = 2;
    }else
    {
        attackingNumOfRolls = 1;
    }

    int d = terrirory2.getUnit();

    int adefendNumOfRolls;if(a<3)
    {
        adefendNumOfRolls = 3;
    }else if(a==2)
    {
        adefendNumOfRolls = 2;
    }else
    {
        adefendNumOfRolls = 1;
    }

    int numDiceRoll = a + d;

    int rolls[];

    for(
    int i = 0;i<numDiceRoll;i++)
    {
        rolls[i] = diceRoll();
    }
}



//in gui 

terr[]

for(s )
{


    if(terr[i].getName()==attackingName)

    index=i;
    break;

}

.

gameEngine.attack(terr[index],terr[indexDef]);



public void attack(Territory act, Territory def)
{

}