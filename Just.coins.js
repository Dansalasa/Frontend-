let coins = 10; // demo starting coins
const maxCoins = 26;

function buyCoins(amount){
  if(coins >= maxCoins){
    document.getElementById("msg").innerText =
      "You have reached the maximum limit (26 coins)";
    return;
  }

  if(coins + amount > maxCoins){
    coins = maxCoins;
  }else{
    coins += amount;
  }

  document.getElementById("coinCount").innerText = coins;
  document.getElementById("msg").innerText =
    "Coins added successfully!";
}