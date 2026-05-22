<!--
@component
This is your page!
-->
<script>
  // Import all the news furniture components
  import ArticleHeader from '$lib/components/Article/ArticleHeader.svelte';
  import ArticleBody from '$lib/components/Article/ArticleBody.svelte';
  import Blockquote from '$lib/components/Article/Blockquote.svelte';
  import Image from '$lib/components/Media/Image.svelte';
  import RelatedLinks from '$lib/components/Article/RelatedLinks.svelte';
  import Map from '$lib/components/Maps/Map.svelte';
  import MapLayer from '$lib/components/Maps/MapLayer.svelte';
  import DropdownInput from '$lib/components/Forms/DropdownInput.svelte';
  import Legend from '$lib/components/Maps/Legend.svelte';
  import SplashHeader from '$lib/components/Article/SplashHeader.svelte';

  let { data } = $props();
  const mhcoms = data.mhcoms;
  let headline = "Hello World";
  let longitude = $state(-95.7129);
  let latitude = $state(37.0902);
  let zoom = $state(3);

  let selectedFirm = $state('');
  let selectedRisk = $state('');

  let mhcomFeatures = $derived(mhcoms.features ?? []);

  let firmOptions = $derived(
    [...new Set(mhcomFeatures.map((row) => row.properties?.PrivateEquityFirm).filter(Boolean))]
      .sort((left, right) => left.localeCompare(right))
      .map((firm) => ({ value: firm, label: firm }))
  );

 let riskOptions = $derived(
    [...new Set(mhcomFeatures.map((row) => row.properties?.Risk).filter(Boolean))]
      .sort((left, right) => left.localeCompare(right))
      .map((risk) => ({ value: risk, label: risk }))
  );

  let filteredFeatures = $derived(
    mhcomFeatures.filter((row) => {
      const matchesRisk =
        selectedRisk === '' || row.properties?.Risk === selectedRisk;
      const matchesFirm =
        selectedFirm === '' ||
        row.properties?.PrivateEquityFirm === selectedFirm;
      return matchesRisk && matchesFirm;
    })
  );

  let filteredData = $derived({
    ...mhcoms,
    features: filteredFeatures,
  });

  let proportionalLegendItems = [
    { value: 1500, label: '1500 units' },
    { value: 1125, label: '1125 units' },
    { value: 750, label: '750 units' },
    { value: 375, label: '375 units' },
    { value: 0, label: '0 units' },
  ];
</script>

<div class="container">
<SplashHeader
    kicker= "Climate Change"
    headline= "Manufactured Housing Residents Are Bearing The Brunt of Climate Change"
    pubDate="Sophie Hayssen | May 22, 2026"
/>
<ArticleBody>

<p>
When the power went out in ViewPoint RV & Golf Resort, resident Kath Noble, 80, recalls chaos. Food spoiled; residents in the 55-and-over community fell in the darkness; some had to be transferred to the hospital for heat-related illness. The outage came in summer 2023 when temperatures in Arizona stayed above 110 degrees for 54 days straight. 
</p>
<p>
“We still have a lot of issues,” said Noble. “It's actually getting hotter every summer and it's getting hotter earlier.” 
</p>
<p>
From the 2025 Texas floods to the Palisades fires, climate change has already decimated communities across the US. In the next thirty years, climate research company First Street estimates that climate change will wipe out over a trillion dollars in home values. 
</p>
<p>
But while the role of climate change in the housing affordability crisis has gained increasing recognition, the plight of manufactured and mobile home residents, like Noble, is often ignored. The average income of a manufactured housing resident is $35,000. According to the Manufactured Housing Institute, that’s less than half of the income for residents in site built homes. Yet for a mix of economic, geographic, and structural reasons, these residents bear the  greatest cost of the US climate crisis. 
</p>
<p>
Manufactured housing stock tends to be built in regions with elevated risk of the climate disaster and in historically hotter areas in the US. Climate resiliency in manufactured housing stock can also vary based on the age of the structure. Moreover, residents often come from vulnerable demographics. The corporate ownership of manufactured housing communities further limits their ability for recourse in the face of disaster. 
</p>
<p>
The current stock of manufactured homes have evolved beyond the stereotypical trailer most commonly associated with the term ‘mobile home.’ For fifty years, these factory-built homes have been constructed to the Housing and Urban Development code.  Manufactured housing is cheaper than site built homes and dubbed  “largest form of unsubsidized affordable housing in the U.S.” by  the Manufactured Housing Institute.  Around 22 million Americans live in manufactured housing communities, also called mobile home parks. In these communities, it’s common for residents to own their housing structure but rent the land it sits on. These residents are often older and low income. 
</p>
<p>
Heat-related issues like the kind Noble experienced are a fact of life for many mobile home residents, especially in the southern and western US. In Maricopa County, where Noble lives, a quarter of heat related deaths in 2024 occurred in mobile home and RV parks, despite the fact that they only make up 5% of housing stock. As temperatures tick up, the issue becomes increasingly pressing. 
</p>
<p>
Manufactured homes are particularly vulnerable to heat. Some older homes have less insulation and low-capacity electrical systems that cannot adequately cool the home. Low-income residents may also avoid turning on their AC to save money and generally lack the same financial resources to  update their home. At the community level, infrastructure at mobile home parks can be old and neglected, kept under the purview of a private landlord. 
</p>
<p>
Communities’ corporate owners also sometimes make rules that leave residents vulnerable. In 2024, the Arizona Association for Manufactured Homeowners, where Noble currently serves as President, advocated for a bill making it illegal for landlords to ban residents from installing air conditioners for aesthetic reasons. The bill ultimately passed. 
</p>
<div class="hero-row">
<Legend 
 title="Risk Level"
 mode="categorical"
 items={[ {  "label": "Very Low",  "color": "#2f8211" }, {  "label": "Relatively Low",  "color": "#bcf904" }, {  "label": "Relatively Moderate",  "color": "#f7df75" }, {  "label": "Relatively High",  "color": "#f29508" }, {  "label": "Very High",  "color": "#fc0505" }, {  "label": "N/A",  "color": "#4d4d4d" } ]}
/>
 <Legend 
    title="Circle Size by Units"
    mode="proportional-symbols"
    items={proportionalLegendItems}
/>
</div>

<br/>
<div class="hero-row">
<DropdownInput 
 label="Filter by risk level."
 placeholder="Choose a risk level…"
 value={selectedRisk}
 options={riskOptions}
 onchange={(event) => (selectedRisk = event.currentTarget.value)}
/>

<DropdownInput 
 label="Filter by private equity firm."
 placeholder="Choose a firm…"
 value={selectedFirm}
 options={firmOptions}
 onchange={(event) => (selectedFirm = event.currentTarget.value)}
/>
</div> 
    <Map
    {longitude}
    {latitude}
    {zoom}
    maxZoomOut={zoom}
    lockCenter={true}
    height={600}
    theme="positron"
    credit="OpenFreeMap / OpenStreetMap contributors"
  >
     <MapLayer
      id="pe-mh"
      type="circle"
      data={filteredData}
      paint={{
        'circle-color': [
          'match',
          ['get', 'Risk'],
          'Very Low', '#2f8211',
          'Relatively Low', '#bcf904',
          'Relatively Moderate', '#f7df75',
          'Relatively High', '#f29508',
          'Very High', '#fc0505',
          '#4d4d4d'
        ],
          'circle-radius': [
            'interpolate',
            ['linear'],
            // convert Units to a number and scale radius accordingly
            ['to-number', ['get', 'Units'], 0],
            0, 2,
            375, 4,
            750, 6,
            1125, 8,
            1500, 10,
          ],
        'circle-stroke-color': '#1a1a1a',
        'circle-stroke-width': 1,
        'circle-opacity': 0.9,
      }}
  popup={(feature) => {
    const p = feature.properties;
    return `<strong>${p.CommunityName}</strong><br/>This community is located at ${p.FullAddress} and owned by ${p.PrivateEquityFirm}`;
  }}
    />
  </Map>
<p>
It’s not just heat. An analysis by the Urban Institute found a greater share of manufactured housing stock was placed in the highest risk census tracts for fires, hurricanes, and tornadoes. Experts note that manufactured housing communities are disproportionately rural and, due to ongoing stigma, can be unfairly zoned out of less climate vulnerable areas. Per a 2018report from the National Consumer Law Center  27 states have protections for manufactured homes against discriminatory zoning practices. Only seven say that manufactured housing cannot be excluded from districts where single family homes are being built. 
</p>
<p>
When storms Helen and Milton hit Florida within weeks of each other in 2024, the Colony Cove mobile home community was caught in the crosshairs. The community is in Ellenton, Florida, which ranks in the highest vulnerability for sea level rise and coastal flooding, according to the U.S. Climate Vulnerability Index. 
</p>
<p>
Many residents lost carports and had trees fall on their homes. John Calabrese, president of the community’s homeowners association, estimates around 100 of the 2,500 homes in the community were damaged so severely that they became unlivable. Most of the homes that suffered damage were older, Calabrese noted.
</p>
<p>
“It was kind of a one-two punch that really devastated not just our community, but this whole area” he said. 
</p>
<p>
An aging supply of mobile homes pose a significant threat to climate resiliency. Homes built before the 1976 implementation of the Housing and Urban Development code are often more affordable but lack the insulation to protect residents and withstand extreme weather.  They can also be in generally poorer condition because of their age. The Urban Institute estimates that there are between 1.24 million and 1.35 million of these mobile homes. 
</p>
<p>
Of the residents in unrepairable homes, Calabrese recalls that many left the community altogether. 
“There were many that just turned the titles to their homes into the owner of the community because they had no way to fix it,” he said. “I know a lot of them got taken in by family.”
Experts and policy makers have touted manufactured housing as a solution to the affordable housing crisis. The 21st Century Road to Housing Act, which is currently awaiting a vote in the House, would remove the requirement for manufactured homes to be built on a permanent chassis. If the law passes, the change would  open up new opportunities to build manufactured housing. 
</p>
<p>
However, the need to shore up housing supply has to come with sustainability in mind. In the long run, homes that can be easily razed or rendered unlivable by a changing climate won’t offer the relief needed to combat the affordability crisis. 
</p>
<p>
“I am very worried that in the rush to increase housing supply at all costs,” said Andrew Rumbach, a researcher at The Urban Institute. “If we're putting that supply in hazard prone areas, we're sort of locking in a whole other generation of housing into these disasters. And again, at the end of the day, that's not affordability. That's all that is sort of delaying the costs of housing.” 
</p>
 



</ArticleBody>
</div>

<style>

  .hero-row {
    width: 100%;
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 0.5rem;
  
  }

</style> 
