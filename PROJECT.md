EVERDAY
===========================

## What is Everday?

Everday is a more-or-less text based, space themed, 4x RPG developed in VueJS. While it will feature minor multiplayer elements, the base design is for a single player experience with an emphasis on story driven gameplay and open world exploration.

Players take on the role of leading a fledgling federation that just discovered faster than light (FTL) travel. This is an expensive method of travel, and players must keep track of their resources or risk losing armies to the depths of space forever.

## Road Map

### Schemas
#### Ships
- name
- size
   - small, medium, large, capital
      - S: 3/squadron
      - M: 2/squadron
      - L: 1/squadron
      - C: 1/squadron/fleet
- role
   - Fighter, Transporter, Explorer, Defender, Commander
   - A single ship have multiple roles
   - Roles exist to help players determine the capabilities of a ship, and have no actual impact on the ship's capabilities
- environment
   - Where it can effectively operate
   - Tanks cannot fight in space, for example
   - Most ships will have a value of "all"
- hull
   - Health of the ship
- shields
   - Protection. Reduce incoming damage by shield strength
- speed
   - How quickly it can act
- power
   - Approximate strength, used for estimating total squadron/fleet strength
- range
   - Distance it can jump
- fuel-consumption
   - Cost to jump
- food-consumption
   - Passive maintenance costs
- cargo
   - Amount of cargo it can hold
   - One unit = one unit of material or 3 humans (1 squadron)
- hangar
   - Room for smaller ships
   - Small ships require 1 unit, medium ships 3
- hardpoints
   - s, m, l, h
   - Amount of weapons/equipment that can be equipped of each size
   - Smaller equipment can be mounted in larger slots
   - Weapons do +1 damage for each tier smaller the target is
   - Weapons do -1 damage for each tier larger the target is
- cost
   - purchase
      - The cost to purchase the ship with credits
   - craft
      - The cost to build a ship from raw materials

### Views

#### Login / Splash

#### Guide / Getting started / Help
#### Game
##### Dashboard
The dashboard provides the user with an overview of their current status


##### System Overview
##### Galaxy Overview
##### Economy Overview
##### Military Overview
##### Diplomacy Screens
###### Negotiations
###### Trade
###### Espionage
###### Relations
##### Research Screens
##### Science Screens
##### Combat Screens
##### Store Screens
##### Engineering Screens
###### Construction
###### Repair
#### Settings
#### Achievements

### Generators
There's a lot of ground to cover in space. Therefore, every planet, system, and galaxy will be procedurally generated for each user.

#### Planet
##### Type
##### Technology
##### Population
##### Government
##### State
##### Economy
##### Moons
##### Coordinates
##### Size
##### Gravity

#### System
##### Government
##### Economy
##### State
##### Bodies
##### Stellar Phenomena
##### Coordinates

#### Galaxy
##### Systems
##### Galactic Phenomena