export class LoremIpsum extends HTMLElement {
    connectedCallback(): void {
        const rnd = Math.floor(lorems.length * Math.random());
        this.appendChild(document.createTextNode(lorems[rnd]));
    }
}

const lorems = [
    `Lorem cillum ex veniam ea. Labore non tempor quis aliquip
aliquip irure ad occaecat ullamco ipsum ad consequat elit ut
quis. Ut id ipsum aliqua sint elit nostrud ex aliqua eu culpa
laboris ex. Eiusmod et id voluptate enim qui dolor incididunt
sunt exercitation quis commodo irure occaecat. Minim laborum ea
Lorem do. Eiusmod elit duis duis irure reprehenderit tempor
occaecat cillum in dolore cillum. Nulla exercitation et nulla
mollit mollit quis reprehenderit in commodo Lorem eiusmod. Lorem
id incididunt laborum. In proident mollit irure ullamco qui
tempor nisi exercitation veniam consequat incididunt culpa.
Laboris voluptate consequat ut in adipisicing. Sunt ex do amet
ipsum duis proident fugiat aliqua aute. Amet aliquip dolor anim
excepteur consectetur nisi officia nostrud qui.`,
    `Anim proident nulla ex labore nostrud velit consequat anim aute
aute do elit dolore. Incididunt mollit Lorem tempor ea cupidatat
Lorem cillum adipisicing nostrud. Mollit fugiat elit ea anim.
Enim Lorem nisi exercitation velit et mollit et ex ea cupidatat
consequat Lorem et. Ut aute nostrud ex. Mollit id reprehenderit
qui pariatur aliquip officia velit incididunt cillum et cillum
irure non ipsum. Dolore cupidatat quis consequat mollit nostrud
commodo laboris nulla ex culpa cupidatat consequat commodo
proident incididunt. Nulla tempor cupidatat esse aliquip in
cupidatat. Quis excepteur sint tempor consectetur in ut pariatur
dolore. Ad qui cupidatat duis deserunt aliqua commodo labore et
fugiat. Proident adipisicing ullamco exercitation exercitation
amet ipsum veniam do.`,
    `Laborum sint anim sint cillum ut nostrud tempor laborum
exercitation exercitation proident dolor. Enim aliqua ipsum
irure cillum aliqua aliqua. Fugiat dolore in duis culpa
voluptate officia dolore irure velit ullamco sit excepteur.
Magna cillum esse elit. In do consequat velit ullamco cupidatat
incididunt consequat veniam. Dolor voluptate reprehenderit est
eu dolor aute eiusmod eiusmod sunt tempor. Commodo et labore
labore. Enim tempor excepteur eiusmod est officia. Commodo
aliqua ullamco fugiat reprehenderit nostrud dolore et laborum
aute sit incididunt anim eiusmod elit occaecat. Mollit commodo
enim reprehenderit. Exercitation incididunt non ipsum anim. Do
nostrud anim duis ex. Magna excepteur do duis id incididunt
officia laborum exercitation aliquip reprehenderit non labore.
Id duis nisi Lorem magna duis id sint culpa est cupidatat ad
adipisicing. Nostrud consectetur magna Lorem. Et eu minim
dolore.`,
    `Ut velit ut anim id ea ea. Anim esse cupidatat magna. Voluptate
ea quis do non irure ea proident aute adipisicing sint excepteur
aute enim pariatur cillum. Officia commodo excepteur nostrud
fugiat sunt est sunt aliqua quis enim occaecat culpa fugiat sint
ea. Laboris magna Lorem ut do laboris est consequat do magna
aute nostrud consectetur magna. Ullamco in nostrud dolore Lorem
duis dolor incididunt cupidatat incididunt. Id commodo cillum ad
eiusmod esse do culpa ea non tempor laborum aliquip dolore.
Aliqua nulla sit adipisicing quis nostrud consequat magna cillum
eiusmod mollit esse. Fugiat proident amet culpa sint et nostrud
aliquip anim sunt est commodo est. Aute nulla veniam deserunt
sit exercitation in in.`,
    `Proident cupidatat labore ullamco reprehenderit reprehenderit
consectetur laborum esse. Aute veniam exercitation duis sunt
cillum. Aliqua enim ex esse in laborum. Labore dolor do fugiat
anim culpa sint quis. Ullamco ex veniam cillum magna dolore
tempor enim. Consectetur sunt irure id consectetur in. Nulla
eiusmod mollit elit tempor incididunt duis id id incididunt enim
et esse. Dolor cillum dolor cupidatat do magna nulla eu.
Exercitation officia nostrud culpa sunt sit. Anim do ipsum aute
duis fugiat. Ad dolor Lorem eu excepteur voluptate consectetur
reprehenderit consectetur ullamco cupidatat ipsum laboris. Amet
do incididunt velit irure. Cupidatat officia proident ex qui
cillum.`,
    `Commodo enim eu nulla aute ad. Qui fugiat ea mollit Lorem veniam
et dolore consequat ipsum pariatur. Incididunt dolore aliquip
duis exercitation tempor magna elit laboris. Duis qui aliqua
veniam cupidatat duis eu cupidatat occaecat dolor est dolore
reprehenderit nulla eu tempor. Aute aliquip eiusmod cillum elit
est culpa ut exercitation veniam fugiat. Fugiat esse non
eiusmod. Velit laboris laboris exercitation sint Lorem laboris
aliquip esse et laboris dolore labore. Commodo commodo quis
culpa nostrud dolor sit cupidatat veniam nulla sunt veniam
consectetur. Amet dolor excepteur dolore duis culpa. Elit est
laborum eu.`,
    `Elit aliquip eiusmod est qui laborum in duis consectetur ipsum.
Anim laborum voluptate cillum enim minim quis dolore occaecat
Lorem fugiat. Magna fugiat culpa id irure eiusmod fugiat. Tempor
culpa officia officia. Veniam non deserunt anim dolore excepteur
elit consequat adipisicing cillum ullamco incididunt et ex. In
ea magna cillum sint voluptate deserunt Lorem ex minim mollit
et. Incididunt mollit excepteur eiusmod fugiat exercitation
ullamco nisi consectetur magna adipisicing voluptate eu qui.
Consequat Lorem laboris ad qui adipisicing qui ut ut minim sint
consequat amet ut labore. Tempor anim exercitation quis labore
commodo amet officia ea officia deserunt exercitation proident
cupidatat. Labore non ea dolore veniam. Velit ea ex commodo
irure fugiat cillum proident cupidatat mollit cupidatat. Mollit
consequat reprehenderit velit sunt esse sint quis adipisicing
voluptate exercitation incididunt voluptate consequat in.
Nostrud ipsum est anim esse aliquip. In ex elit exercitation
ullamco dolore ullamco elit est ullamco consequat aliquip
deserunt consequat et. Consectetur pariatur laboris mollit
incididunt in excepteur nulla nulla reprehenderit commodo id.
Aliquip labore adipisicing labore sint velit.`,
    `Ut aute consectetur nulla adipisicing proident excepteur veniam
consequat nostrud qui amet. Reprehenderit labore deserunt
commodo aute laboris laborum ullamco adipisicing dolor deserunt
mollit. Consequat fugiat veniam cillum consequat cupidatat
commodo pariatur id. Sunt magna mollit anim ipsum nostrud sint
magna culpa culpa cillum id tempor. Nisi magna dolore
adipisicing eiusmod sint laborum magna ullamco et magna velit
mollit. Esse occaecat ullamco excepteur velit veniam velit est.
Et ex aliqua est dolor sunt non ut Lorem irure labore
exercitation labore duis elit aliqua. Eiusmod cillum commodo ut
esse aute adipisicing nulla culpa dolore ullamco duis. Enim
mollit in ullamco irure do in proident. Excepteur sint aliquip
nostrud labore fugiat eu. Minim nostrud adipisicing aute aliquip
dolore aliquip incididunt. Qui cupidatat aliqua est sunt Lorem
aliquip reprehenderit duis exercitation veniam elit. Duis
incididunt nulla non Lorem Lorem aliqua ad dolore quis.
Voluptate elit cupidatat velit est proident aute.`,
    `Esse nisi ut enim mollit et exercitation quis. Aliquip aliqua
ullamco dolore aliqua. Amet occaecat ex veniam reprehenderit
incididunt laborum duis amet anim ex occaecat cillum. Ipsum non
voluptate mollit consectetur reprehenderit. Nisi ullamco laborum
laborum anim et Lorem ut qui aliquip ad anim non. Dolore fugiat
excepteur reprehenderit do magna reprehenderit eiusmod. Esse
incididunt irure nulla deserunt. Proident nulla laborum proident
ipsum cillum culpa duis occaecat in do non.`,
    `Reprehenderit adipisicing in labore nisi. Et ut elit minim
consectetur ullamco occaecat labore minim incididunt. Minim
nulla sint culpa aute occaecat voluptate eu sint minim
consectetur ullamco magna. Aute dolore officia non deserunt ad
ipsum enim aliquip. Velit sint eiusmod esse id exercitation ea
cupidatat dolor cillum ullamco. Fugiat do culpa elit cillum.
Reprehenderit reprehenderit cillum reprehenderit sit proident
ullamco tempor Lorem dolor. Quis Lorem laboris non consectetur
enim commodo exercitation. Adipisicing cillum reprehenderit elit
nulla. Deserunt mollit tempor cillum mollit dolor Lorem proident
pariatur aliquip. Sunt culpa ullamco ex ad ex incididunt ullamco
laborum sit deserunt adipisicing. Consequat velit elit minim.
Dolor irure proident do proident nulla est enim duis.`,
    `Ea irure ut laboris consequat dolore anim deserunt laboris
fugiat magna esse aliquip deserunt id id. Nulla exercitation
laborum enim nulla irure id do cupidatat pariatur. Consequat
sunt ut quis pariatur aliquip commodo proident ullamco commodo
anim nisi eiusmod officia in ex. Pariatur veniam do sint anim
anim laborum ut ad nulla minim velit consectetur fugiat.
Proident tempor proident consectetur adipisicing sunt aliquip
sint magna cupidatat enim cupidatat commodo eu. Eiusmod
exercitation qui tempor labore excepteur nulla adipisicing eu
eiusmod irure esse irure. Ex magna adipisicing excepteur
incididunt quis do commodo sunt in. Dolore culpa laborum sit
elit consequat magna ea adipisicing velit esse aliqua elit
cupidatat veniam. Incididunt reprehenderit labore duis ullamco
ullamco pariatur enim amet commodo eu voluptate proident id do.
Eu in elit nulla velit officia. Ipsum proident commodo quis in
ad veniam id incididunt eu ipsum fugiat aliquip velit minim
magna.`,
    `Aute consequat dolore fugiat minim magna eu incididunt sit
consectetur ex adipisicing sit nostrud ullamco sint. Cillum
irure nisi pariatur tempor. Quis irure irure irure fugiat.
Aliqua non officia non quis sint ad irure deserunt. Excepteur
labore elit consequat in velit sunt nulla. Incididunt proident
ea eu dolore ea dolor et adipisicing veniam cillum aute.
Voluptate duis dolore laborum cillum esse tempor ut aute
excepteur occaecat cupidatat non consequat. Occaecat sit
cupidatat adipisicing excepteur cillum sunt sint qui dolore
mollit officia ad. Elit cillum sint magna reprehenderit
voluptate eiusmod labore non commodo sint fugiat elit sit ipsum.`,
    `Cupidatat sunt ut deserunt non Lorem. Mollit culpa esse eu
mollit. Magna culpa nostrud minim magna anim elit irure fugiat
non quis enim ex nulla velit quis. Cillum nulla irure ut magna
sunt sunt consectetur minim consequat sunt anim ad mollit
consectetur ipsum. Sit dolor voluptate fugiat laborum in. Magna
esse anim mollit exercitation consectetur ad dolor elit commodo.
Dolor nisi consequat pariatur Lorem dolore ad commodo laborum
duis sint adipisicing ut aute. Culpa velit labore pariatur
cillum et labore ipsum. Velit culpa sint minim commodo deserunt
magna cillum aute. Commodo aute ea nostrud ipsum do sit irure
non. Aliqua in duis aute aliqua cillum ea consectetur cupidatat
aliquip deserunt voluptate commodo consequat. Occaecat elit anim
nisi officia sit dolor voluptate elit.`,
];
