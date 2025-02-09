import { t } from 'ttag'
import baseConfig, { updateConfig } from 'seedsource-ui/lib/config'
import { get, urlEncode } from 'seedsource-ui/lib/io'
import SpeciesConstraint from 'seedsource-ui/lib/containers/SpeciesConstraint'
import Logo from 'seedsource-ui/images/logo.png'
import { receiveTransfer } from 'seedsource-ui/lib/actions/variables'

const serializeSpeciesConstraint = ({ climate }: { climate: any }, { species }: { species: string }) => {
  const { time, model } = climate.site
  let climateFragment

  if (time === '1961_1990' || time === '1981_2010') {
    climateFragment = `p${time}_800m`
  } else {
    climateFragment = `15gcm_${model}_${time}`
  }

  return {
    service: `${species}_${climateFragment}_pa`,
  }
}

const speciesConstraints = [
  ['pico', t`Lodgepole Pine`],
  ['pisi', t`Sitka Spruce`],
  ['psme', t`Douglas-fir`],
  ['pipo', t`Ponderosa Pine`],
  ['pien', t`Engelmann Spruce`],
]

export default () => {
  updateConfig({
    languages: {
      'en-us': 'English',
      'es-mx': 'Español',
    },
    apiRoot: '/sst/',
    logo: Logo as string,
    species: [
      {
        name: 'psme',
        label: t`Douglas-fir`,
      },
      {
        name: 'pico',
        label: t`Lodgepole pine`,
      },
      {
        name: 'piba',
        label: t`Jack pine`,
      },
      {
        name: 'pipo',
        label: t`Ponderosa pine`,
      },
      {
        name: 'pima',
        label: t`Black spruce`,
      },
      {
        name: 'thpl',
        label: t`Western red cedar`,
      },
      {
        name: 'pimo',
        label: t`Western white pine`,
      },
      {
        name: 'abam',
        label: t`Pacific silver fir`,
      },
      {
        name: 'abco',
        label: t`White fir`,
      },
      {
        name: 'abgr',
        label: t`Grand fir`,
      },
      {
        name: 'abpr',
        label: t`Noble Fir`,
      },
      {
        name: 'absh',
        label: t`Shasta red fir`,
      },
      {
        name: 'alru2',
        label: t`Red alder`,
      },
      {
        name: 'cade27',
        label: t`Incense cedar`,
      },
      {
        name: 'chla',
        label: t`Port orford cedar`,
      },
      {
        name: 'chno',
        label: t`Alaska yellow cedar`,
      },
      {
        name: 'laoc',
        label: t`Western larch`,
      },
      {
        name: 'pial',
        label: t`Whitebark pine`,
      },
      {
        name: 'pien',
        label: t`Engelmann spruce`,
      },
      {
        name: 'pije',
        label: t`Jeffrey pine`,
      },
      {
        name: 'pila',
        label: t`Sugar pine`,
      },
      {
        name: 'tabr2',
        label: t`Pacific yew`,
      },
      {
        name: 'tshe',
        label: t`Western hemlock`,
      },
      {
        name: 'tsme',
        label: t`Mountain hemlock`,
      },
    ],
    functions: [
      {
        name: 'HGT',
        label: t`Scaled Height`,
        // Tmin_sp is multiplied by 10, so we divide by 10 here to get the real value
        fn: 'math_e**(6.705 + (0.07443/10 * Tmin_sp))',
        transfer: 66,
        units: '',
        customTransfer: false,
        species: ['pico'],
      },
      {
        name: 'HT',
        label: t`Height`,
        // Tmin_sp is multiplied by 10, so we divide by 10 here to get the real value
        fn: '(2.80648/10 * Tmin_sp) + (0.03923*Eref) + (0.02529*PPT_sm) + 20.96417',
        transfer: 5.2,
        units: '',
        customTransfer: false,
        species: ['pien'],
      },
    ],
    defaultVariables: [
      {
        variable: 'MCMT',
        getValue: dispatch => dispatch(receiveTransfer('MCMT', 20, null, null)),
      },
      {
        variable: 'SHM',
        getValue: (dispatch, point, region) => {
          const url = `/arcgis/rest/services/${region}_1961_1990Y_SHM/MapServer/identify/?${urlEncode({
            f: 'json',
            tolerance: 2,
            imageDisplay: '1600,1031,96',
            geometryType: 'esriGeometryPoint',
            mapExtent: '0,0,0,0',
            geometry: JSON.stringify(point),
          })}`

          get(url)
            .then(response => response.json())
            .then(json => {
              const pixelValue = json.results[0].attributes['Pixel value']
              dispatch(receiveTransfer('SHM', pixelValue / 2, null, null))
            })
        },
      },
    ],
    constraints: {
      objects: {
        ...baseConfig.constraints.objects,
        ...Object.fromEntries(
          speciesConstraints.map(([species, label]) => [
            species,
            {
              component: SpeciesConstraint,
              values: { label, species },
              constraint: 'raster',
              serialize: serializeSpeciesConstraint,
            },
          ]),
        ),
      },
      categories: [
        ...baseConfig.constraints.categories,
        {
          name: 'species',
          label: t`Species Range`,
          type: 'category',
          items: speciesConstraints.map(([name, label]) => ({ name, label, type: 'constraint' })),
        },
      ],
    },
    layers: {
      ...baseConfig.layers,
      ...Object.fromEntries(
        speciesConstraints.map(([species, label]) => [
          `constraint-${species}`,
          {
            type: 'raster',
            label,
            show: () => true,
            url: ({ runConfiguration: { climate } }: any) =>
              `/tiles/${serializeSpeciesConstraint({ climate }, { species }).service}/{z}/{x}/{y}.png`,
            zIndex: 2,
          },
        ]),
      ),
    },
    layerCategories: [
      ...baseConfig.layerCategories,
      {
        label: t`Constraints`,
        show: () => true,
        layers: speciesConstraints.map(([species]) => `constraint-${species}`),
      },
    ],
  })
}
