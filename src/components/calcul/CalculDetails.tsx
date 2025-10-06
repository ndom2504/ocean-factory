'use client'

import { useState, useEffect } from 'react'
import { EyeIcon } from '@heroicons/react/24/outline'
import { useAppContext } from '@/contexts/AppContext'

// Interface pour les enregistrements de facturation des milestones
interface MilestoneFacturation {
  id: number
  numeroEtape: string
  noJalon: string
  dateFacture: string
  description: string
  taxe: number
  montantFacture: number
  noFacture: string
  pspcClaimNumber: string
  montantTTC: number
  c228: number
  c229: number
  c230: number
  c231: number
}

// Interface pour les enregistrements DCR
interface DCRFacturation {
  id: number
  numeroEtape: string
  noJalon: string
  dateFacture: string
  description: string
  dateDCR: string
  taxe: number
  montant: number
  noFacture: string
  pspcClaimNumber: string
  montantTTC: number
  ligneSAP: string
  c228: number
  c229: number
  c230: number
  c231: number
}

export default function CalculDetails() {
  const { milestones, dcrs, setMilestones, setDcrs, getDocumentsForItem } = useAppContext()
  const [activeTab, setActiveTab] = useState<'milestones' | 'dcr' | 'bilan' | 'kpi'>('milestones')

  // États pour les données de facturation
  const [milestonesFactures, setMilestonesFactures] = useState<MilestoneFacturation[]>([
    // Milestone #1 - PDR
    {
      id: 1,
      numeroEtape: '#1',
      noJalon: 'J001',
      dateFacture: '26-12-2019',
      description: 'Milestone #1 PDR - C228',
      taxe: 5,
      montantFacture: 43836215,
      noFacture: '90067777',
      pspcClaimNumber: '',
      montantTTC: 46128026,
      c228: 43836215,
      c229: 0,
      c230: 0,
      c231: 0
    },
    {
      id: 2,
      numeroEtape: '#1',
      noJalon: 'J002',
      dateFacture: '26-12-2019',
      description: 'Milestone #1 PDR - C229',
      taxe: 5,
      montantFacture: 43836215,
      noFacture: '90067791',
      pspcClaimNumber: '',
      montantTTC: 46128026,
      c228: 0,
      c229: 43836215,
      c230: 0,
      c231: 0
    },
    {
      id: 3,
      numeroEtape: '#1',
      noJalon: 'J003',
      dateFacture: '26-12-2019',
      description: 'Milestone #1 PDR - C230',
      taxe: 15,
      montantFacture: 43836215,
      noFacture: '90067784',
      pspcClaimNumber: '',
      montantTTC: 50411447,
      c228: 0,
      c229: 0,
      c230: 43836215,
      c231: 0
    },
    {
      id: 4,
      numeroEtape: '#1',
      noJalon: 'J004',
      dateFacture: '26-12-2019',
      description: 'Milestone #1 PDR - C231',
      taxe: 15,
      montantFacture: 43836215,
      noFacture: '90067785',
      pspcClaimNumber: '',
      montantTTC: 50411447,
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 43836215
    },
    // Milestone #2 - CDR
    {
      id: 5,
      numeroEtape: '#2',
      noJalon: 'J005',
      dateFacture: '29-05-2020',
      description: 'Milestone #2 CDR - C228',
      taxe: 5,
      montantFacture: 87572721,
      noFacture: '90060158',
      pspcClaimNumber: '',
      montantTTC: 91951357,
      c228: 87572721,
      c229: 0,
      c230: 0,
      c231: 0
    },
    {
      id: 6,
      numeroEtape: '#2',
      noJalon: 'J006',
      dateFacture: '03-06-2020',
      description: 'Milestone #2 CDR - C229',
      taxe: 5,
      montantFacture: 87572721,
      noFacture: '90060158',
      pspcClaimNumber: '',
      montantTTC: 91951357,
      c228: 0,
      c229: 87572721,
      c230: 0,
      c231: 0
    },
    {
      id: 7,
      numeroEtape: '#2',
      noJalon: 'J007',
      dateFacture: '03-06-2020',
      description: 'Milestone #2 CDR - C230',
      taxe: 15,
      montantFacture: 87572721,
      noFacture: '90060404',
      pspcClaimNumber: '',
      montantTTC: 100708629,
      c228: 0,
      c229: 0,
      c230: 87572721,
      c231: 0
    },
    {
      id: 8,
      numeroEtape: '#2',
      noJalon: 'J008',
      dateFacture: '03-06-2020',
      description: 'Milestone #2 CDR - C231',
      taxe: 15,
      montantFacture: 87572721,
      noFacture: '90060404',
      pspcClaimNumber: '',
      montantTTC: 100708629,
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 87572721
    },
    // Milestone #3 - Contract financial security
    {
      id: 9,
      numeroEtape: '#3',
      noJalon: 'J009',
      dateFacture: '04-06-2019',
      description: 'Milestone #3 Contract financial security - C228',
      taxe: 5,
      montantFacture: 13165625,
      noFacture: '90041739',
      pspcClaimNumber: '',
      montantTTC: 13823906,
      c228: 13165625,
      c229: 0,
      c230: 0,
      c231: 0
    },
    {
      id: 10,
      numeroEtape: '#3',
      noJalon: 'J010',
      dateFacture: '04-06-2019',
      description: 'Milestone #3 Contract financial security - C229',
      taxe: 5,
      montantFacture: 13165625,
      noFacture: '90041740',
      pspcClaimNumber: '',
      montantTTC: 13823906,
      c228: 0,
      c229: 13165625,
      c230: 0,
      c231: 0
    },
    {
      id: 11,
      numeroEtape: '#3',
      noJalon: 'J011',
      dateFacture: '04-06-2019',
      description: 'Milestone #3 Contract financial security - C230',
      taxe: 15,
      montantFacture: 13165625,
      noFacture: '90071741',
      pspcClaimNumber: '',
      montantTTC: 15140469,
      c228: 0,
      c229: 0,
      c230: 13165625,
      c231: 0
    },
    {
      id: 12,
      numeroEtape: '#3',
      noJalon: 'J012',
      dateFacture: '04-06-2019',
      description: 'Milestone #3 Contract financial security - C231',
      taxe: 15,
      montantFacture: 13165625,
      noFacture: '90071742',
      pspcClaimNumber: '',
      montantTTC: 15140469,
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 13165625
    },
    // Milestone #4 - PO Material
    {
      id: 13,
      numeroEtape: '#4-a',
      noJalon: 'J013',
      dateFacture: '04-06-2020',
      description: 'Milestone #4-PO Material - 228',
      taxe: 5,
      montantFacture: 3612512,
      noFacture: '90060479',
      pspcClaimNumber: '',
      montantTTC: 3793138,
      c228: 3612512,
      c229: 0,
      c230: 0,
      c231: 0
    },
    {
      id: 14,
      numeroEtape: '#4-a',
      noJalon: 'J014',
      dateFacture: '04-06-2020',
      description: 'Milestone #4-PO Material - 229',
      taxe: 5,
      montantFacture: 3612512,
      noFacture: '90060479',
      pspcClaimNumber: '',
      montantTTC: 3793138,
      c228: 0,
      c229: 3612512,
      c230: 0,
      c231: 0
    },
    {
      id: 15,
      numeroEtape: '#4-a',
      noJalon: 'J015',
      dateFacture: '04-06-2020',
      description: 'Milestone #4-PO Material - 230',
      taxe: 15,
      montantFacture: 3612512,
      noFacture: '90060480',
      pspcClaimNumber: '',
      montantTTC: 4154389,
      c228: 0,
      c229: 0,
      c230: 3612512,
      c231: 0
    },
    {
      id: 16,
      numeroEtape: '#4-a',
      noJalon: 'J016',
      dateFacture: '04-06-2020',
      description: 'Milestone #4-PO Material - 231',
      taxe: 15,
      montantFacture: 3612512,
      noFacture: '90060481',
      pspcClaimNumber: '',
      montantTTC: 4154389,
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 3612512
    },
    // Milestone #5 - PO Propulsion
    {
      id: 17,
      numeroEtape: '#5-a',
      noJalon: 'J017',
      dateFacture: '04-06-2020',
      description: 'Milestone #5-PO Propulsion - 228',
      taxe: 5,
      montantFacture: 20600987,
      noFacture: '90060483',
      pspcClaimNumber: '',
      montantTTC: 21631036,
      c228: 20600987,
      c229: 0,
      c230: 0,
      c231: 0
    },
    {
      id: 18,
      numeroEtape: '#5-a',
      noJalon: 'J018',
      dateFacture: '04-06-2020',
      description: 'Milestone #5-PO Propulsion - 229',
      taxe: 5,
      montantFacture: 20600987,
      noFacture: '90060486',
      pspcClaimNumber: '',
      montantTTC: 21631036,
      c228: 0,
      c229: 20600987,
      c230: 0,
      c231: 0
    },
    {
      id: 19,
      numeroEtape: '#5-a',
      noJalon: 'J019',
      dateFacture: '04-06-2020',
      description: 'Milestone #5-PO Propulsion - 230',
      taxe: 15,
      montantFacture: 20600987,
      noFacture: '90060487',
      pspcClaimNumber: '',
      montantTTC: 23691135,
      c228: 0,
      c229: 0,
      c230: 20600987,
      c231: 0
    },
    {
      id: 20,
      numeroEtape: '#5-a',
      noJalon: 'J020',
      dateFacture: '04-06-2020',
      description: 'Milestone #5-PO Propulsion - 231',
      taxe: 15,
      montantFacture: 20600987,
      noFacture: '90060488',
      pspcClaimNumber: '',
      montantTTC: 23691135,
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 20600987
    },
    // Milestone #6 - PO Electrical
    {
      id: 21,
      numeroEtape: '#6-a',
      noJalon: 'J021',
      dateFacture: '04-06-2020',
      description: 'Milestone #6-PO Electrical - 228',
      taxe: 5,
      montantFacture: 44208425,
      noFacture: '90060489',
      pspcClaimNumber: '',
      montantTTC: 46418846,
      c228: 44208425,
      c229: 0,
      c230: 0,
      c231: 0
    },
    {
      id: 22,
      numeroEtape: '#6-a',
      noJalon: 'J022',
      dateFacture: '04-06-2020',
      description: 'Milestone #6-PO Electrical - 229',
      taxe: 5,
      montantFacture: 44208425,
      noFacture: '90060489',
      pspcClaimNumber: '',
      montantTTC: 46418846,
      c228: 0,
      c229: 44208425,
      c230: 0,
      c231: 0
    },
    {
      id: 23,
      numeroEtape: '#6-a',
      noJalon: 'J023',
      dateFacture: '04-06-2020',
      description: 'Milestone #6-PO Electrical - 230',
      taxe: 15,
      montantFacture: 44208425,
      noFacture: '90060499',
      pspcClaimNumber: '',
      montantTTC: 50839689,
      c228: 0,
      c229: 0,
      c230: 44208425,
      c231: 0
    },
    {
      id: 24,
      numeroEtape: '#6-a',
      noJalon: 'J024',
      dateFacture: '04-06-2020',
      description: 'Milestone #6-PO Electrical - 231',
      taxe: 15,
      montantFacture: 44208425,
      noFacture: '90060500',
      pspcClaimNumber: '',
      montantTTC: 50839689,
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 44208425
    },
    // Milestone #12 - PO Steel
    {
      id: 25,
      numeroEtape: '#12-a',
      noJalon: 'J025',
      dateFacture: '04-06-2020',
      description: 'Milestone #12-PO Steel - 228',
      taxe: 5,
      montantFacture: 8759000,
      noFacture: '90060512',
      pspcClaimNumber: '',
      montantTTC: 9196950,
      c228: 8759000,
      c229: 0,
      c230: 0,
      c231: 0
    },
    {
      id: 26,
      numeroEtape: '#12-a',
      noJalon: 'J026',
      dateFacture: '04-06-2020',
      description: 'Milestone #12-PO Steel - 229',
      taxe: 5,
      montantFacture: 8759000,
      noFacture: '90060513',
      pspcClaimNumber: '',
      montantTTC: 9196950,
      c228: 0,
      c229: 8759000,
      c230: 0,
      c231: 0
    },
    {
      id: 27,
      numeroEtape: '#12-a',
      noJalon: 'J027',
      dateFacture: '04-06-2020',
      description: 'Milestone #12-PO Steel - 230',
      taxe: 15,
      montantFacture: 8759000,
      noFacture: '90060516',
      pspcClaimNumber: '',
      montantTTC: 10072850,
      c228: 0,
      c229: 0,
      c230: 8759000,
      c231: 0
    },
    {
      id: 28,
      numeroEtape: '#12-a',
      noJalon: 'J028',
      dateFacture: '04-06-2020',
      description: 'Milestone #12-PO Steel - 231',
      taxe: 15,
      montantFacture: 8759000,
      noFacture: '90060517',
      pspcClaimNumber: '',
      montantTTC: 10072850,
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 8759000
    },
    // Milestone #14 - PO Training
    {
      id: 29,
      numeroEtape: '#14-a',
      noJalon: 'J029',
      dateFacture: '04-06-2020',
      description: 'Milestone #14-PO Training - 228',
      taxe: 5,
      montantFacture: 342500,
      noFacture: '90060521',
      pspcClaimNumber: '',
      montantTTC: 359625,
      c228: 342500,
      c229: 0,
      c230: 0,
      c231: 0
    },
    {
      id: 30,
      numeroEtape: '#14-a',
      noJalon: 'J030',
      dateFacture: '04-06-2020',
      description: 'Milestone #14-PO Training - 229',
      taxe: 5,
      montantFacture: 342500,
      noFacture: '90060529',
      pspcClaimNumber: '',
      montantTTC: 359625,
      c228: 0,
      c229: 342500,
      c230: 0,
      c231: 0
    },
    {
      id: 31,
      numeroEtape: '#14-a',
      noJalon: 'J031',
      dateFacture: '04-06-2020',
      description: 'Milestone #14-PO Training - 230',
      taxe: 15,
      montantFacture: 342500,
      noFacture: '90060527',
      pspcClaimNumber: '',
      montantTTC: 393875,
      c228: 0,
      c229: 0,
      c230: 342500,
      c231: 0
    },
    {
      id: 32,
      numeroEtape: '#14-a',
      noJalon: 'J032',
      dateFacture: '04-06-2020',
      description: 'Milestone #14-PO Training - 231',
      taxe: 15,
      montantFacture: 342500,
      noFacture: '90060531',
      pspcClaimNumber: '',
      montantTTC: 393875,
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 342500
    },
    // Milestone #15 - Delivery of Mat1
    {
      id: 33,
      numeroEtape: '#15',
      noJalon: 'J033',
      dateFacture: '27-08-2020',
      description: 'Milestone #15 Delivery of Mat1 - 228',
      taxe: 5,
      montantFacture: 260505050,
      noFacture: '90064414',
      pspcClaimNumber: '',
      montantTTC: 273530303,
      c228: 260505050,
      c229: 0,
      c230: 0,
      c231: 0
    },
    {
      id: 34,
      numeroEtape: '#15',
      noJalon: 'J034',
      dateFacture: '27-08-2020',
      description: 'Milestone #15 Delivery of Mat1 - 229',
      taxe: 5,
      montantFacture: 260505050,
      noFacture: '90064422',
      pspcClaimNumber: '',
      montantTTC: 273530303,
      c228: 0,
      c229: 260505050,
      c230: 0,
      c231: 0
    },
    {
      id: 35,
      numeroEtape: '#15',
      noJalon: 'J035',
      dateFacture: '27-08-2020',
      description: 'Milestone #15 Delivery of Mat1 - 230',
      taxe: 15,
      montantFacture: 260505050,
      noFacture: '90064424',
      pspcClaimNumber: '',
      montantTTC: 299580808,
      c228: 0,
      c229: 0,
      c230: 260505050,
      c231: 0
    },
    {
      id: 36,
      numeroEtape: '#15',
      noJalon: 'J036',
      dateFacture: '27-08-2020',
      description: 'Milestone #15 Delivery of Mat1 - 231',
      taxe: 15,
      montantFacture: 260505050,
      noFacture: '90064429',
      pspcClaimNumber: '',
      montantTTC: 299580808,
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 260505050
    },
    // Milestone #6-b - Delivery of electrical equipment electronique 228
    {
      id: 37,
      numeroEtape: '#6-b',
      noJalon: 'J037',
      dateFacture: '2021-05-15',
      description: 'Milestone #6-b Delivery of electrical equipment electronique 228',
      taxe: 5,
      montantFacture: 87720657,
      noFacture: '90083266',
      pspcClaimNumber: '',
      montantTTC: 92106690,
      c228: 87720657,
      c229: 0,
      c230: 0,
      c231: 0
    },
    // Milestone #7 - Hull, deck and superstructure enclosed and accepted
    {
      id: 38,
      numeroEtape: '#7',
      noJalon: 'J038',
      dateFacture: '2021-11-24',
      description: 'Milestone #7 Hull, deck and superstructure enclosed and accepted',
      taxe: 5,
      montantFacture: 219931803,
      noFacture: '90087901',
      pspcClaimNumber: '',
      montantTTC: 230928393,
      c228: 219931803,
      c229: 0,
      c230: 0,
      c231: 0
    },
    // Milestone #6-b - Delivery of electrical equipment electronique C229
    {
      id: 39,
      numeroEtape: '#6-b',
      noJalon: 'J039',
      dateFacture: '2022-05-05',
      description: 'Milestone #6-b Delivery of electrical equipment electronique C229',
      taxe: 5,
      montantFacture: 87572721,
      noFacture: '90090292',
      pspcClaimNumber: '',
      montantTTC: 91951357,
      c228: 0,
      c229: 87572721,
      c230: 0,
      c231: 0
    },
    // Milestone #6-b - Prime Moves installed and accepted by Canada C230
    {
      id: 40,
      numeroEtape: '#6-b',
      noJalon: 'J040',
      dateFacture: '2022-05-05',
      description: 'Milestone #6-b Prime Moves installed and accepted by Canada C230',
      taxe: 5,
      montantFacture: 87572721,
      noFacture: '90090421',
      pspcClaimNumber: '',
      montantTTC: 91951357,
      c228: 0,
      c229: 0,
      c230: 87572721,
      c231: 0
    },
    // Milestone #6-b - Prime Moves installed and accepted by Canada C231
    {
      id: 41,
      numeroEtape: '#6-b',
      noJalon: 'J041',
      dateFacture: '2022-05-05',
      description: 'Milestone #6-b Prime Moves installed and accepted by Canada C231',
      taxe: 5,
      montantFacture: 87572721,
      noFacture: '90090532',
      pspcClaimNumber: '',
      montantTTC: 91951357,
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 87572721
    },
    // Milestone #7 - Hull, deck and superstructure enclosed and accepted C229
    {
      id: 42,
      numeroEtape: '#7',
      noJalon: 'J042',
      dateFacture: '2022-05-05',
      description: 'Milestone #7 Hull, deck and superstructure enclosed and accepted C229',
      taxe: 5,
      montantFacture: 219931803,
      noFacture: '90090530',
      pspcClaimNumber: '',
      montantTTC: 230928393,
      c228: 0,
      c229: 219931803,
      c230: 0,
      c231: 0
    },
    // Additional milestones from 2022-2024
    {
      id: 43,
      numeroEtape: '#7-b',
      noJalon: 'J043',
      dateFacture: '2022-05-31',
      description: 'Milestone #7 Prime Moves Alignment',
      taxe: 5,
      montantFacture: 11115000,
      noFacture: '90101546',
      pspcClaimNumber: '',
      montantTTC: 11670750,
      c228: 11115000,
      c229: 0,
      c230: 0,
      c231: 0
    },
    {
      id: 44,
      numeroEtape: '#8-a',
      noJalon: 'J044',
      dateFacture: '2022-05-31',
      description: 'Milestone #8 Delivery of Propulsion Machinery test results',
      taxe: 5,
      montantFacture: 10896500,
      noFacture: '90102558',
      pspcClaimNumber: '',
      montantTTC: 11441325,
      c228: 10896500,
      c229: 0,
      c230: 0,
      c231: 0
    },
    {
      id: 45,
      numeroEtape: '#8-a',
      noJalon: 'J045',
      dateFacture: '2022-05-31',
      description: 'Milestone #8-C229',
      taxe: 15,
      montantFacture: 10896500,
      noFacture: '90102558',
      pspcClaimNumber: '',
      montantTTC: 12530975,
      c228: 0,
      c229: 10896500,
      c230: 0,
      c231: 0
    },
    {
      id: 46,
      numeroEtape: '#8-a',
      noJalon: 'J046',
      dateFacture: '2022-10-24',
      description: 'Milestone #8 Delivery of Propulsion Machinery',
      taxe: 15,
      montantFacture: 12514445,
      noFacture: '90102590',
      pspcClaimNumber: '',
      montantTTC: 14391612,
      c228: 0,
      c229: 0,
      c230: 12514445,
      c231: 0
    },
    {
      id: 47,
      numeroEtape: '#8-a',
      noJalon: 'J047',
      dateFacture: '2022-11-04',
      description: 'Milestone #8 Delivery of Electrical Equipment',
      taxe: 15,
      montantFacture: 12514445,
      noFacture: '90102591',
      pspcClaimNumber: '',
      montantTTC: 14391612,
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 12514445
    },
    {
      id: 48,
      numeroEtape: '#4-b',
      noJalon: 'J048',
      dateFacture: '2023-04-27',
      description: 'Milestone #4-b Delivery of propulsion machinery',
      taxe: 15,
      montantFacture: 12614485,
      noFacture: '90111652',
      pspcClaimNumber: '',
      montantTTC: 14506658,
      c228: 0,
      c229: 0,
      c230: 12614485,
      c231: 0
    },
    {
      id: 49,
      numeroEtape: '#4-b',
      noJalon: 'J049',
      dateFacture: '2023-05-02',
      description: 'Milestone #4-b Delivery of Electrical Equipment Software',
      taxe: 15,
      montantFacture: 10031964,
      noFacture: '90112041',
      pspcClaimNumber: '',
      montantTTC: 11536759,
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 10031964
    },
    // Continue with additional entries from 2023-2024
    {
      id: 50,
      numeroEtape: '#16-a',
      noJalon: 'J050',
      dateFacture: '2023-06-17',
      description: 'Milestone #16-C228',
      taxe: 5,
      montantFacture: 10896500,
      noFacture: '90114217',
      pspcClaimNumber: '',
      montantTTC: 11441325,
      c228: 10896500,
      c229: 0,
      c230: 0,
      c231: 0
    },
    {
      id: 51,
      numeroEtape: '#16-a',
      noJalon: 'J051',
      dateFacture: '2023-06-17',
      description: 'Milestone #16-C229',
      taxe: 15,
      montantFacture: 10896500,
      noFacture: '90114218',
      pspcClaimNumber: '',
      montantTTC: 12530975,
      c228: 0,
      c229: 10896500,
      c230: 0,
      c231: 0
    },
    {
      id: 52,
      numeroEtape: '#16-a',
      noJalon: 'J052',
      dateFacture: '2023-06-17',
      description: 'Milestone #16-C230',
      taxe: 15,
      montantFacture: 10896500,
      noFacture: '90114219',
      pspcClaimNumber: '',
      montantTTC: 12530975,
      c228: 0,
      c229: 0,
      c230: 10896500,
      c231: 0
    },
    // Training Plan milestones
    {
      id: 53,
      numeroEtape: '#14-b1',
      noJalon: 'J053',
      dateFacture: '2024-08-15',
      description: 'Milestone #14-b1 Training Plan including course garments complete',
      taxe: 5,
      montantFacture: 18690952,
      noFacture: '90142012',
      pspcClaimNumber: '',
      montantTTC: 19625500,
      c228: 18690952,
      c229: 0,
      c230: 0,
      c231: 0
    },
    {
      id: 54,
      numeroEtape: '#14-b1',
      noJalon: 'J054',
      dateFacture: '2024-08-15',
      description: 'Milestone #14-b1 Training Plan including course garments complete',
      taxe: 15,
      montantFacture: 18690952,
      noFacture: '90142018',
      pspcClaimNumber: '',
      montantTTC: 21494595,
      c228: 0,
      c229: 18690952,
      c230: 0,
      c231: 0
    },
    {
      id: 55,
      numeroEtape: '#14-b1',
      noJalon: 'J055',
      dateFacture: '2024-08-15',
      description: 'Milestone #14-b1 Training Plan including course garments complete',
      taxe: 15,
      montantFacture: 18690952,
      noFacture: '90142018',
      pspcClaimNumber: '',
      montantTTC: 21494595,
      c228: 0,
      c229: 0,
      c230: 18690952,
      c231: 0
    },
    // Spares verified by Canada milestones
    {
      id: 56,
      numeroEtape: '#12-b2',
      noJalon: 'J056',
      dateFacture: '2024-08-16',
      description: 'Milestone #12-b2 Spares verified by Canada at shipyard before shipment',
      taxe: 5,
      montantFacture: 14074944,
      noFacture: '90142117',
      pspcClaimNumber: '',
      montantTTC: 14778691,
      c228: 14074944,
      c229: 0,
      c230: 0,
      c231: 0
    },
    {
      id: 57,
      numeroEtape: '#12-b2',
      noJalon: 'J057',
      dateFacture: '2024-08-16',
      description: 'Milestone #12-b2 Spares verified by Canada at shipyard before shipment',
      taxe: 5,
      montantFacture: 14074944,
      noFacture: '90142117',
      pspcClaimNumber: '',
      montantTTC: 14778691,
      c228: 0,
      c229: 14074944,
      c230: 0,
      c231: 0
    },
    // Final delivery milestones
    {
      id: 58,
      numeroEtape: '#10-b2',
      noJalon: 'J058',
      dateFacture: '2024-09-22',
      description: 'Milestone #10-b2 Delivery of ILS Products & Documents',
      taxe: 5,
      montantFacture: 46434563,
      noFacture: '90142069',
      pspcClaimNumber: '',
      montantTTC: 48756291,
      c228: 46434563,
      c229: 0,
      c230: 0,
      c231: 0
    },
    {
      id: 59,
      numeroEtape: '#14-b2',
      noJalon: 'J059',
      dateFacture: '2024-09-25',
      description: 'Milestone #14-b2 Training Complete and accepted by Canada',
      taxe: 5,
      montantFacture: 46234942,
      noFacture: '90142013',
      pspcClaimNumber: '',
      montantTTC: 48546689,
      c228: 46234942,
      c229: 0,
      c230: 0,
      c231: 0
    },
    {
      id: 60,
      numeroEtape: '#14-b2',
      noJalon: 'J060',
      dateFacture: '2024-09-25',
      description: 'Milestone #14-b2 Training Complete and accepted by Canada',
      taxe: 5,
      montantFacture: 46234942,
      noFacture: '90142013',
      pspcClaimNumber: '',
      montantTTC: 48546689,
      c228: 0,
      c229: 46234942,
      c230: 0,
      c231: 0
    },
    {
      id: 61,
      numeroEtape: '#2-a',
      noJalon: 'J061',
      dateFacture: '2024-09-30',
      description: 'Milestone #2-a Trials Complete and accepted by Canada',
      taxe: 5,
      montantFacture: 58750641,
      noFacture: '90142016',
      pspcClaimNumber: '',
      montantTTC: 61688173,
      c228: 0,
      c229: 0,
      c230: 58750641,
      c231: 0
    },
    {
      id: 62,
      numeroEtape: '#2-a',
      noJalon: 'J062',
      dateFacture: '2024-09-30',
      description: 'Milestone #2-a Trials Complete and accepted by Canada',
      taxe: 5,
      montantFacture: 58750641,
      noFacture: '90142016',
      pspcClaimNumber: '',
      montantTTC: 61688173,
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 58750641
    },
    {
      id: 63,
      numeroEtape: '#11',
      noJalon: 'J063',
      dateFacture: '2024-09-30',
      description: 'Milestone #11 Delivery & Delivery & Acceptance',
      taxe: 5,
      montantFacture: 319490250,
      noFacture: '90144139',
      pspcClaimNumber: '',
      montantTTC: 335464763,
      c228: 319490250,
      c229: 0,
      c230: 0,
      c231: 0
    },
    // Final milestones from the last batch
    {
      id: 64,
      numeroEtape: '#11-2',
      noJalon: 'J064',
      dateFacture: '2024-09-20',
      description: 'Milestone #11-2 Livraison et acceptation des navires à leur BFC respective CFR',
      taxe: 5,
      montantFacture: 314800051,
      noFacture: '90144139',
      pspcClaimNumber: '',
      montantTTC: 330540054,
      c228: 0,
      c229: 0,
      c230: 314800051,
      c231: 0
    },
    {
      id: 65,
      numeroEtape: '#17',
      noJalon: 'J065',
      dateFacture: '2024-09-20',
      description: 'Milestone #17 EDA Adjustment',
      taxe: 5,
      montantFacture: 200000000,
      noFacture: '90144924',
      pspcClaimNumber: '',
      montantTTC: 210000000,
      c228: 0,
      c229: 200000000,
      c230: 0,
      c231: 0
    },
    {
      id: 66,
      numeroEtape: '#5-1b',
      noJalon: 'J066',
      dateFacture: '2024-09-20',
      description: 'Milestone #5-1b All Technical Data Package elements delivered and accepted by Canada',
      taxe: 5,
      montantFacture: 59381637,
      noFacture: '90144183',
      pspcClaimNumber: '',
      montantTTC: 62350719,
      c228: 0,
      c229: 0,
      c230: 59381637,
      c231: 0
    },
    {
      id: 67,
      numeroEtape: '#5-2b',
      noJalon: 'J067',
      dateFacture: '2024-09-20',
      description: 'Milestone #5-2b All Technical Data Package elements delivered and accepted by Canada',
      taxe: 5,
      montantFacture: 59381637,
      noFacture: '90144183',
      pspcClaimNumber: '',
      montantTTC: 62350719,
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 59381637
    },
    {
      id: 68,
      numeroEtape: '#19-a',
      noJalon: 'J068',
      dateFacture: '2024-11-13',
      description: 'Milestone #19-a Final delivery to destination of NLT-1 and all correction deliverables completed and accepted by Canada',
      taxe: 5,
      montantFacture: 300000000,
      noFacture: '90147494',
      pspcClaimNumber: '',
      montantTTC: 315000000,
      c228: 300000000,
      c229: 0,
      c230: 0,
      c231: 0
    },
    {
      id: 69,
      numeroEtape: '#19-b',
      noJalon: 'J069',
      dateFacture: '2024-11-13',
      description: 'Milestone #19-b Final delivery to destination of NLT-2 and all correction deliverables completed and accepted by Canada',
      taxe: 5,
      montantFacture: 300000000,
      noFacture: '90147494',
      pspcClaimNumber: '',
      montantTTC: 315000000,
      c228: 0,
      c229: 300000000,
      c230: 0,
      c231: 0
    },
    {
      id: 70,
      numeroEtape: '#5-1b',
      noJalon: 'J070',
      dateFacture: '2024-11-13',
      description: 'Milestone #5-1b Pre-Requisites Complete and accepted by Canada',
      taxe: 5,
      montantFacture: 32958770,
      noFacture: '90147497',
      pspcClaimNumber: '',
      montantTTC: 34606709,
      c228: 0,
      c229: 0,
      c230: 32958770,
      c231: 0
    },
    {
      id: 71,
      numeroEtape: '#5-2b',
      noJalon: 'J071',
      dateFacture: '2024-11-13',
      description: 'Milestone #5-2b Pre-Requisites Complete and accepted by Canada',
      taxe: 5,
      montantFacture: 32958770,
      noFacture: '90147497',
      pspcClaimNumber: '',
      montantTTC: 34606709,
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 32958770
    },
    {
      id: 72,
      numeroEtape: '#7-3a',
      noJalon: 'J072',
      dateFacture: '2024-11-18',
      description: 'Milestone #7-3a Deckhouse Complete and accepted by Canada',
      taxe: 15,
      montantFacture: 0,
      noFacture: '90149684',
      pspcClaimNumber: '',
      montantTTC: 0,
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 0
    },
    {
      id: 73,
      numeroEtape: '#7-3a',
      noJalon: 'J073',
      dateFacture: '2025-01-15',
      description: 'Milestone #7-3a Deckhouse Complete and accepted by Canada',
      taxe: 15,
      montantFacture: 32958771,
      noFacture: '90151423',
      pspcClaimNumber: '',
      montantTTC: 37902587,
      c228: 0,
      c229: 0,
      c230: 32958771,
      c231: 0
    },
    {
      id: 74,
      numeroEtape: '#8-3a',
      noJalon: 'J074',
      dateFacture: '2025-04-04',
      description: 'Milestone #8-3a Propulsion systems installed and accepted by Canada',
      taxe: 14,
      montantFacture: 0,
      noFacture: '90156947',
      pspcClaimNumber: '',
      montantTTC: 0,
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 0
    },
    {
      id: 75,
      numeroEtape: '#7-3b',
      noJalon: 'J075',
      dateFacture: '2025-04-10',
      description: 'Milestone #7-3b Hull enclosed and accepted by Canada',
      taxe: 14,
      montantFacture: 0,
      noFacture: '90162650',
      pspcClaimNumber: '',
      montantTTC: 0,
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 0
    },
    {
      id: 76,
      numeroEtape: '#8-3a',
      noJalon: 'J076',
      dateFacture: '2025-05-05',
      description: 'Milestone #8-3a Prime movers installed and accepted by Canada',
      taxe: 14,
      montantFacture: 87972721,
      noFacture: '90157565',
      pspcClaimNumber: '',
      montantTTC: 100268702,
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 87972721
    },
    {
      id: 77,
      numeroEtape: '#7-3b',
      noJalon: 'J077',
      dateFacture: '2025-05-05',
      description: 'Milestone #7-3b Hull enclosed and accepted by Canada',
      taxe: 14,
      montantFacture: 98999311,
      noFacture: '90159401',
      pspcClaimNumber: '',
      montantTTC: 112839175,
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 98999311
    },
    {
      id: 78,
      numeroEtape: '#7-3c',
      noJalon: 'J078',
      dateFacture: '2025-05-05',
      description: 'Milestone #7-3c Deckhouse and hull assembly complete and accepted by Canada',
      taxe: 14,
      montantFacture: 87972721,
      noFacture: '90159401',
      pspcClaimNumber: '',
      montantTTC: 100268702,
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 87972721
    },
    {
      id: 79,
      numeroEtape: '#15b',
      noJalon: 'J079',
      dateFacture: '2025-06-05',
      description: 'Milestone #15b Loop final delivery to destination of NLT-3 and all commercial deliverables complete and accepted by Canada',
      taxe: 14,
      montantFacture: 140000000,
      noFacture: '90159401',
      pspcClaimNumber: '',
      montantTTC: 159600000,
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 140000000
    },
    {
      id: 80,
      numeroEtape: '#11-1',
      noJalon: 'J080',
      dateFacture: '2025-06-23',
      description: 'Milestone #11-1 Delivery and Final Acceptance of vessels complete at respective CFR bases Holdback',
      taxe: 5,
      montantFacture: 10395412,
      noFacture: '90158973',
      pspcClaimNumber: '',
      montantTTC: 10915183,
      c228: 10395412,
      c229: 0,
      c230: 0,
      c231: 0
    },
    {
      id: 81,
      numeroEtape: '#11-2',
      noJalon: 'J081',
      dateFacture: '2025-06-23',
      description: 'Milestone #11-2 Delivery and Final Acceptance of vessels complete at respective CFR bases Holdback',
      taxe: 5,
      montantFacture: 15079613,
      noFacture: '90158978',
      pspcClaimNumber: '',
      montantTTC: 15833594,
      c228: 0,
      c229: 15079613,
      c230: 0,
      c231: 0
    }
  ])

  const [dcrFactures, setDCRFactures] = useState<DCRFacturation[]>([
    // DCR 1 - Réception pièces récupération
    {
      id: 1,
      numeroEtape: 'DCR 1',
      noJalon: '001',
      dateFacture: '14-01-2021',
      description: 'Réception pièces récupération C-001 - ENG',
      dateDCR: '03/12/2019',
      taxe: 5,
      montant: 2650000,
      noFacture: 'FactOF001498',
      pspcClaimNumber: '38',
      montantTTC: 2799300,
      ligneSAP: 'Err 520',
      c228: 2650000,
      c229: 0,
      c230: 0,
      c231: 0
    },
    {
      id: 2,
      numeroEtape: 'DCR 1',
      noJalon: '002',
      dateFacture: '05-06-2023',
      description: 'DCR 001-229-R01 (planned 06/2023)',
      dateDCR: '03/12/2019',
      taxe: 5,
      montant: 1611930,
      noFacture: '90120496',
      pspcClaimNumber: '82',
      montantTTC: 1697126,
      ligneSAP: 'Err 520',
      c228: 0,
      c229: 1617730,
      c230: 0,
      c231: 0
    },
    {
      id: 3,
      numeroEtape: 'DCR 1',
      noJalon: '003',
      dateFacture: '15-11-2023',
      description: 'DCR 001-230-R01 (planned 06/2023)',
      dateDCR: '03/12/2019',
      taxe: 5,
      montant: 1597365,
      noFacture: '90127876',
      pspcClaimNumber: '95',
      montantTTC: 1677170,
      ligneSAP: 'Err 520',
      c228: 0,
      c229: 0,
      c230: 1597365,
      c231: 0
    },
    {
      id: 4,
      numeroEtape: 'DCR 1',
      noJalon: '004',
      dateFacture: '14-08-2025',
      description: 'DCR 001-230-R01',
      dateDCR: '03/12/2019',
      taxe: 14,
      montant: 1604125,
      noFacture: '90183876',
      pspcClaimNumber: '',
      montantTTC: 1828703,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 1604125,
      c231: 0
    },
    {
      id: 5,
      numeroEtape: 'DCR 1',
      noJalon: '005',
      dateFacture: '',
      description: 'DCR 001-231-R01',
      dateDCR: '03/12/2019',
      taxe: 14,
      montant: 1604730,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 1829392,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 1604730
    },
    // DCR 2
    {
      id: 6,
      numeroEtape: 'DCR 2',
      noJalon: '001',
      dateFacture: '',
      description: 'Emplacement topside et cathodic DCR 002 - ENG Identification électrical DCR 002 - ENG',
      dateDCR: '08/11/2019',
      taxe: 5,
      montant: 0,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 0,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 0
    },
    {
      id: 7,
      numeroEtape: 'DCR 2',
      noJalon: '002',
      dateFacture: '',
      description: 'DCR 002-229-R01',
      dateDCR: '08/11/2019',
      taxe: 5,
      montant: 0,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 0,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 0
    },
    {
      id: 8,
      numeroEtape: 'DCR 2',
      noJalon: '003',
      dateFacture: '',
      description: 'DCR 002-230-R01',
      dateDCR: '08/11/2019',
      taxe: 14,
      montant: 0,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 0,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 0
    },
    {
      id: 9,
      numeroEtape: 'DCR 2',
      noJalon: '004',
      dateFacture: '',
      description: 'DCR 002-231-R01',
      dateDCR: '08/11/2019',
      taxe: 14,
      montant: 0,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 0,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 0
    },
    // DCR 3
    {
      id: 10,
      numeroEtape: 'DCR 3',
      noJalon: '001',
      dateFacture: '',
      description: 'DCR 003-228 Bilingual Label Plates',
      dateDCR: '02/04/2021',
      taxe: 5,
      montant: 0,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 0,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 0
    },
    {
      id: 11,
      numeroEtape: 'DCR 3',
      noJalon: '002',
      dateFacture: '',
      description: 'DCR 003-229 Bilingual Label Plates',
      dateDCR: '02/04/2021',
      taxe: 5,
      montant: 0,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 0,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 0
    },
    {
      id: 12,
      numeroEtape: 'DCR 3',
      noJalon: '003',
      dateFacture: '',
      description: 'DCR 003-230 Bilingual Label Plates',
      dateDCR: '02/04/2021',
      taxe: 14,
      montant: 0,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 0,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 0
    },
    {
      id: 13,
      numeroEtape: 'DCR 3',
      noJalon: '004',
      dateFacture: '',
      description: 'DCR 003-231 Bilingual Label Plates',
      dateDCR: '02/04/2021',
      taxe: 14,
      montant: 0,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 0,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 0
    },
    // DCR 4
    {
      id: 14,
      numeroEtape: 'DCR 4',
      noJalon: '001',
      dateFacture: '30-06-2021',
      description: 'Défense supplémentaire sur DCR 004 - ENG Placed supplémentDCR 004 - ENG',
      dateDCR: '17/04/2020',
      taxe: 5,
      montant: 2214000,
      noFacture: '90084735',
      pspcClaimNumber: '40',
      montantTTC: 2324700,
      ligneSAP: 'Err 520',
      c228: 2214000,
      c229: 0,
      c230: 0,
      c231: 0
    },
    {
      id: 15,
      numeroEtape: 'DCR 004',
      noJalon: '002',
      dateFacture: '13-06-2023',
      description: 'DCR 004-229-R01 (planned 06/2023)',
      dateDCR: '17/04/2020',
      taxe: 5,
      montant: 1415700,
      noFacture: '90096473',
      pspcClaimNumber: '62',
      montantTTC: 1486485,
      ligneSAP: 'Err 520',
      c228: 0,
      c229: 1415700,
      c230: 0,
      c231: 0
    },
    {
      id: 16,
      numeroEtape: 'DCR 004',
      noJalon: '003',
      dateFacture: '13-06-2023',
      description: 'DCR 004-230-R01 (planned 06/2023)',
      dateDCR: '17/04/2020',
      taxe: 5,
      montant: 1372800,
      noFacture: '90096473',
      pspcClaimNumber: '62',
      montantTTC: 1441440,
      ligneSAP: 'Err 520',
      c228: 0,
      c229: 0,
      c230: 1372800,
      c231: 0
    },
    {
      id: 17,
      numeroEtape: 'DCR 004',
      noJalon: '004',
      dateFacture: '',
      description: 'DCR 004-230-R01',
      dateDCR: '17/04/2020',
      taxe: 14,
      montant: 1378000,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 1570920,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 1378000,
      c231: 0
    },
    {
      id: 18,
      numeroEtape: 'DCR 004',
      noJalon: '005',
      dateFacture: '',
      description: 'DCR 004-231-R01',
      dateDCR: '17/04/2020',
      taxe: 14,
      montant: 1378000,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 1570920,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 1378000
    },
    // DCR 005
    {
      id: 19,
      numeroEtape: 'DCR 005',
      noJalon: '001',
      dateFacture: '',
      description: 'Heated windsDCR 005 - ENG Heated windsDCR 005 - ENG',
      dateDCR: '31/01/2020',
      taxe: 5,
      montant: 0,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 0,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 0
    },
    {
      id: 20,
      numeroEtape: 'DCR 005',
      noJalon: '002',
      dateFacture: '',
      description: 'DCR 005-229-R01',
      dateDCR: '31/01/2020',
      taxe: 5,
      montant: 0,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 0,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 0
    },
    {
      id: 21,
      numeroEtape: 'DCR 005',
      noJalon: '003',
      dateFacture: '',
      description: 'DCR 005-230-R01',
      dateDCR: '31/01/2020',
      taxe: 15,
      montant: 0,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 0,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 0
    },
    {
      id: 22,
      numeroEtape: 'DCR 005',
      noJalon: '004',
      dateFacture: '',
      description: 'DCR 005-231-R01',
      dateDCR: '31/01/2020',
      taxe: 15,
      montant: 0,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 0,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 0
    },
    // DCR 006
    {
      id: 23,
      numeroEtape: 'DCR 006',
      noJalon: '001',
      dateFacture: '01-07-2021',
      description: 'Tie-down DCR 006-ENG-R01 Tie-down DCR 006-ENG-R01',
      dateDCR: '18/11/2019',
      taxe: 5,
      montant: 910000,
      noFacture: '90077717',
      pspcClaimNumber: '41',
      montantTTC: 955500,
      ligneSAP: 'Err 520',
      c228: 910000,
      c229: 0,
      c230: 0,
      c231: 0
    },
    {
      id: 24,
      numeroEtape: 'DCR 006',
      noJalon: '002',
      dateFacture: '26-05-2022',
      description: 'DCR 006-229-R01 (planned 10/2021)',
      dateDCR: '01/06/2020',
      taxe: 5,
      montant: 5497000,
      noFacture: '90095522',
      pspcClaimNumber: '55',
      montantTTC: 5771850,
      ligneSAP: 'Err 520',
      c228: 0,
      c229: 5497000,
      c230: 0,
      c231: 0
    },
    {
      id: 25,
      numeroEtape: 'DCR 006',
      noJalon: '003',
      dateFacture: '26-05-2022',
      description: 'DCR 006-230-R01 (planned 02/2022)',
      dateDCR: '01/06/2020',
      taxe: 5,
      montant: 4977300,
      noFacture: '90095522',
      pspcClaimNumber: '55',
      montantTTC: 5226165,
      ligneSAP: 'Err 520',
      c228: 0,
      c229: 0,
      c230: 4977300,
      c231: 0
    },
    {
      id: 26,
      numeroEtape: 'DCR 006',
      noJalon: '004',
      dateFacture: '14-08-2025',
      description: 'DCR 006-230-R01',
      dateDCR: '01/06/2020',
      taxe: 14,
      montant: 4877300,
      noFacture: '90183886',
      pspcClaimNumber: '',
      montantTTC: 5580122,
      ligneSAP: 'Err 520',
      c228: 0,
      c229: 0,
      c230: 4877300,
      c231: 0
    },
    {
      id: 27,
      numeroEtape: 'DCR 006',
      noJalon: '005',
      dateFacture: '',
      description: 'DCR 006-231-R01',
      dateDCR: '01/06/2020',
      taxe: 14,
      montant: 4877300,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 5560122,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 4877300
    },
    // DCR 007
    {
      id: 28,
      numeroEtape: 'DCR 007',
      noJalon: '001',
      dateFacture: '06-10-2021',
      description: 'NBFT isolationDCR 007-ENG-R01 NBFT isolationDCR 007-ENG-R01',
      dateDCR: '08/04/2020',
      taxe: 5,
      montant: 1540000,
      noFacture: '90084185',
      pspcClaimNumber: '48',
      montantTTC: 1617000,
      ligneSAP: 'Err 520',
      c228: 1540000,
      c229: 0,
      c230: 0,
      c231: 0
    },
    {
      id: 29,
      numeroEtape: 'DCR 007',
      noJalon: '002',
      dateFacture: '01-12-2023',
      description: 'DCR 007-229-R01 (planned 04/2022)',
      dateDCR: '08/04/2020',
      taxe: 5,
      montant: 2707900,
      noFacture: '90128041',
      pspcClaimNumber: '93',
      montantTTC: 2843295,
      ligneSAP: 'Err 520',
      c228: 0,
      c229: 2707900,
      c230: 0,
      c231: 0
    },
    {
      id: 30,
      numeroEtape: 'DCR 007',
      noJalon: '003',
      dateFacture: '01-12-2023',
      description: 'DCR 007-229-R01 (planned 06/2023)',
      dateDCR: '08/04/2020',
      taxe: 5,
      montant: 2278880,
      noFacture: '90128048',
      pspcClaimNumber: '94',
      montantTTC: 2392824,
      ligneSAP: 'Err 520',
      c228: 0,
      c229: 0,
      c230: 2278880,
      c231: 0
    },
    {
      id: 31,
      numeroEtape: 'DCR 007',
      noJalon: '004',
      dateFacture: '',
      description: 'DCR 007-230-R01',
      dateDCR: '08/04/2020',
      taxe: 14,
      montant: 2278880,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 2598037,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 2278880,
      c231: 0
    },
    {
      id: 32,
      numeroEtape: 'DCR 007',
      noJalon: '005',
      dateFacture: '',
      description: 'DCR 007-231-R01',
      dateDCR: '08/04/2020',
      taxe: 14,
      montant: 2278880,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 2598037,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 2278880
    },
    // DCR 008
    {
      id: 33,
      numeroEtape: 'DCR 008',
      noJalon: '001',
      dateFacture: '30-07-2021',
      description: 'Emergency escape routes DCR 008-ENG Procedures prédeterminées DCR 008-ENG',
      dateDCR: '09/04/2020',
      taxe: 5,
      montant: 1560000,
      noFacture: '90079313',
      pspcClaimNumber: '42',
      montantTTC: 1638000,
      ligneSAP: 'Err 520',
      c228: 1560000,
      c229: 0,
      c230: 0,
      c231: 0
    },
    {
      id: 34,
      numeroEtape: 'DCR 008',
      noJalon: '002',
      dateFacture: '13-10-2023',
      description: 'DCR 008-229-R01 (planned 04/2022)',
      dateDCR: '09/04/2020',
      taxe: 5,
      montant: 5756400,
      noFacture: '90124914',
      pspcClaimNumber: '87',
      montantTTC: 6044220,
      ligneSAP: 'Err 520',
      c228: 0,
      c229: 5756400,
      c230: 0,
      c231: 0
    },
    {
      id: 35,
      numeroEtape: 'DCR 008',
      noJalon: '003',
      dateFacture: '24-10-2023',
      description: 'DCR 008-230-R01 (planned 06/2022)',
      dateDCR: '09/04/2020',
      taxe: 5,
      montant: 4637720,
      noFacture: '90125550',
      pspcClaimNumber: '90',
      montantTTC: 4869606,
      ligneSAP: 'Err 520',
      c228: 0,
      c229: 0,
      c230: 4637720,
      c231: 0
    },
    {
      id: 36,
      numeroEtape: 'DCR 008',
      noJalon: '004',
      dateFacture: '',
      description: 'DCR 008-230-R01',
      dateDCR: '09/04/2020',
      taxe: 14,
      montant: 4637720,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 5287001,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 4637720,
      c231: 0
    },
    {
      id: 37,
      numeroEtape: 'DCR 008',
      noJalon: '005',
      dateFacture: '',
      description: 'DCR 008-231-R01',
      dateDCR: '09/04/2020',
      taxe: 14,
      montant: 4637720,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 5287001,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 4637720
    },
    // DCR 009
    {
      id: 38,
      numeroEtape: 'DCR 009',
      noJalon: '001',
      dateFacture: '14-06-2022',
      description: 'Space heatersDCR 009-ENG-R01',
      dateDCR: '09/04/2020',
      taxe: 5,
      montant: 2785320,
      noFacture: '90096585',
      pspcClaimNumber: '64',
      montantTTC: 2924586,
      ligneSAP: 'Err 520',
      c228: 2785320,
      c229: 0,
      c230: 0,
      c231: 0
    },
    {
      id: 39,
      numeroEtape: 'DCR 009',
      noJalon: '002',
      dateFacture: '14-06-2022',
      description: 'DCR 009-229-R01',
      dateDCR: '09/04/2020',
      taxe: 5,
      montant: 9762760,
      noFacture: '90096585',
      pspcClaimNumber: '64',
      montantTTC: 10250898,
      ligneSAP: 'Err 520',
      c228: 0,
      c229: 9762760,
      c230: 0,
      c231: 0
    },
    {
      id: 40,
      numeroEtape: 'DCR 009',
      noJalon: '003',
      dateFacture: '06-11-2023',
      description: 'DCR 009-230-R01',
      dateDCR: '09/04/2020',
      taxe: 5,
      montant: 8921440,
      noFacture: '90126508',
      pspcClaimNumber: '92',
      montantTTC: 9367512,
      ligneSAP: 'Err 520',
      c228: 0,
      c229: 0,
      c230: 8921440,
      c231: 0
    },
    {
      id: 41,
      numeroEtape: 'DCR 009',
      noJalon: '004',
      dateFacture: '',
      description: 'DCR 009-230-R01',
      dateDCR: '09/04/2020',
      taxe: 14,
      montant: 8970540,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 10226416,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 8970540,
      c231: 0
    },
    {
      id: 42,
      numeroEtape: 'DCR 009',
      noJalon: '005',
      dateFacture: '',
      description: 'DCR 009-231-R01',
      dateDCR: '09/04/2020',
      taxe: 14,
      montant: 8970540,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 10226416,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 8970540
    },
    // DCR 010
    {
      id: 43,
      numeroEtape: 'DCR 010',
      noJalon: '001',
      dateFacture: '',
      description: 'Switchboard equipment install DCR 010-228-R01 Switchboard equipment install DCR 010-228-R01',
      dateDCR: '03/12/2019',
      taxe: 5,
      montant: 0,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 0,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 0
    },
    {
      id: 44,
      numeroEtape: 'DCR 010',
      noJalon: '002',
      dateFacture: '',
      description: 'DCR 010-229-R01',
      dateDCR: '03/12/2019',
      taxe: 5,
      montant: 0,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 0,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 0
    },
    {
      id: 45,
      numeroEtape: 'DCR 010',
      noJalon: '003',
      dateFacture: '',
      description: 'DCR 010-230-R01',
      dateDCR: '03/12/2019',
      taxe: 15,
      montant: 0,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 0,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 0
    },
    {
      id: 46,
      numeroEtape: 'DCR 010',
      noJalon: '004',
      dateFacture: '',
      description: 'DCR 010-231-R01',
      dateDCR: '03/12/2019',
      taxe: 15,
      montant: 0,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 0,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 0
    },
    // DCR 011
    {
      id: 47,
      numeroEtape: 'DCR 011',
      noJalon: '001',
      dateFacture: '30-07-2021',
      description: 'DCR 011-ENG-A4G connexions in steel power',
      dateDCR: '09/04/2020',
      taxe: 5,
      montant: 2730000,
      noFacture: '90080573',
      pspcClaimNumber: '43',
      montantTTC: 2866500,
      ligneSAP: 'Err 520',
      c228: 2730000,
      c229: 0,
      c230: 0,
      c231: 0
    },
    {
      id: 48,
      numeroEtape: 'DCR 011',
      noJalon: '002',
      dateFacture: '13-06-2023',
      description: 'DCR 011-229-R01 (planned 04/2022)',
      dateDCR: '09/04/2020',
      taxe: 5,
      montant: 1677830,
      noFacture: '90124915',
      pspcClaimNumber: '88',
      montantTTC: 1761722,
      ligneSAP: 'Err 520',
      c228: 0,
      c229: 1677830,
      c230: 0,
      c231: 0
    },
    {
      id: 49,
      numeroEtape: 'DCR 011',
      noJalon: '003',
      dateFacture: '13-06-2023',
      description: 'DCR 011-230-R01 (planned 06/2022)',
      dateDCR: '09/04/2020',
      taxe: 5,
      montant: 1365820,
      noFacture: '90124915',
      pspcClaimNumber: '89',
      montantTTC: 1434111,
      ligneSAP: 'Err 520',
      c228: 0,
      c229: 0,
      c230: 1365820,
      c231: 0
    },
    {
      id: 50,
      numeroEtape: 'DCR 011',
      noJalon: '004',
      dateFacture: '',
      description: 'DCR 011-230-R01',
      dateDCR: '09/04/2020',
      taxe: 14,
      montant: 1392810,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 1587803,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 1392810,
      c231: 0
    },
    {
      id: 51,
      numeroEtape: 'DCR 011',
      noJalon: '005',
      dateFacture: '',
      description: 'DCR 011-231-R01',
      dateDCR: '09/04/2020',
      taxe: 14,
      montant: 1392810,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 1587803,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 1392810
    },
    // DCR 012
    {
      id: 52,
      numeroEtape: 'DCR 012',
      noJalon: '001',
      dateFacture: '',
      description: 'Master equipment listDCR 012-0115-R02 Master equipment listDCR 012-0915-R02',
      dateDCR: '',
      taxe: 0,
      montant: 0,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 0,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 0
    },
    {
      id: 53,
      numeroEtape: 'DCR 012',
      noJalon: '002',
      dateFacture: '21-07-2021',
      description: 'Review comment in French comDCR 013-ENG Review comment in Z-drive geaDCR 013-ENG',
      dateDCR: '27/11/2019',
      taxe: 5,
      montant: 700000,
      noFacture: '90080383',
      pspcClaimNumber: '44',
      montantTTC: 735000,
      ligneSAP: 'Err 520',
      c228: 700000,
      c229: 0,
      c230: 0,
      c231: 0
    },
    // DCR 013
    {
      id: 54,
      numeroEtape: 'DCR 013',
      noJalon: '001',
      dateFacture: '05-11-2023',
      description: 'DCR 013-229-R02 (planned 06/2022)',
      dateDCR: '27/11/2019',
      taxe: 5,
      montant: 883550,
      noFacture: '90126231',
      pspcClaimNumber: '91',
      montantTTC: 927728,
      ligneSAP: 'Err 520',
      c228: 0,
      c229: 883550,
      c230: 0,
      c231: 0
    },
    {
      id: 55,
      numeroEtape: 'DCR 013',
      noJalon: '002',
      dateFacture: '30-11-2023',
      description: 'DCR 013-230-R02 (planned 06/2022)',
      dateDCR: '27/11/2019',
      taxe: 5,
      montant: 804200,
      noFacture: '90127389',
      pspcClaimNumber: '96',
      montantTTC: 844410,
      ligneSAP: 'Err 520',
      c228: 0,
      c229: 0,
      c230: 804200,
      c231: 0
    },
    {
      id: 56,
      numeroEtape: 'DCR 013',
      noJalon: '003',
      dateFacture: '',
      description: 'DCR 013-230-R02',
      dateDCR: '27/11/2019',
      taxe: 14,
      montant: 804200,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 916788,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 804200,
      c231: 0
    },
    {
      id: 57,
      numeroEtape: 'DCR 013',
      noJalon: '004',
      dateFacture: '',
      description: 'DCR 013-231-R02',
      dateDCR: '27/11/2019',
      taxe: 14,
      montant: 804200,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 916788,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 804200
    },
    // DCR 014
    {
      id: 58,
      numeroEtape: 'DCR 014',
      noJalon: '001',
      dateFacture: '21-07-2021',
      description: 'Laundry equipment DCR 014-ENG Laundry equipment DCR 014-ENG',
      dateDCR: '26/11/2019',
      taxe: 5,
      montant: 518000,
      noFacture: '90080386',
      pspcClaimNumber: '45',
      montantTTC: 543900,
      ligneSAP: 'Err 520',
      c228: 518000,
      c229: 0,
      c230: 0,
      c231: 0
    },
    {
      id: 59,
      numeroEtape: 'DCR 014',
      noJalon: '002',
      dateFacture: '27-07-2023',
      description: 'DCR 014-229-R03 (planned 06/2022)',
      dateDCR: '26/11/2019',
      taxe: 5,
      montant: 1876730,
      noFacture: '90120494',
      pspcClaimNumber: '83',
      montantTTC: 1970567,
      ligneSAP: 'Err 520',
      c228: 0,
      c229: 1876730,
      c230: 0,
      c231: 0
    },
    {
      id: 60,
      numeroEtape: 'DCR 014',
      noJalon: '003',
      dateFacture: '18-12-2023',
      description: 'DCR 014-230-R03 (planned 06/2022)',
      dateDCR: '26/11/2019',
      taxe: 5,
      montant: 1684130,
      noFacture: '90128561',
      pspcClaimNumber: '98',
      montantTTC: 1768337,
      ligneSAP: 'Err 520',
      c228: 0,
      c229: 0,
      c230: 1684130,
      c231: 0
    },
    {
      id: 61,
      numeroEtape: 'DCR 014',
      noJalon: '004',
      dateFacture: '',
      description: 'DCR 014-230-R03',
      dateDCR: '26/11/2019',
      taxe: 14,
      montant: 1684130,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 1919928,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 1684130,
      c231: 0
    },
    {
      id: 62,
      numeroEtape: 'DCR 014',
      noJalon: '005',
      dateFacture: '',
      description: 'DCR 014-231-R03',
      dateDCR: '26/11/2019',
      taxe: 14,
      montant: 1684130,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 1919928,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 1684130
    },
    // DCR 015
    {
      id: 63,
      numeroEtape: 'DCR 015',
      noJalon: '001',
      dateFacture: '01-07-2021',
      description: 'External light maintenance DCR 015-ENG External light maintenance DCR 015-ENG',
      dateDCR: '26/11/2019',
      taxe: 5,
      montant: 394000,
      noFacture: '90080418',
      pspcClaimNumber: '46',
      montantTTC: 413700,
      ligneSAP: 'Err 520',
      c228: 394000,
      c229: 0,
      c230: 0,
      c231: 0
    },
    {
      id: 64,
      numeroEtape: 'DCR 015',
      noJalon: '002',
      dateFacture: '15-06-2022',
      description: 'DCR 015-229-R04 (planned 06/2022)',
      dateDCR: '26/11/2019',
      taxe: 5,
      montant: 1231000,
      noFacture: '90120637',
      pspcClaimNumber: '84',
      montantTTC: 1292550,
      ligneSAP: 'Err 520',
      c228: 0,
      c229: 1231000,
      c230: 0,
      c231: 0
    },
    {
      id: 65,
      numeroEtape: 'DCR 015',
      noJalon: '003',
      dateFacture: '30-11-2023',
      description: 'DCR 015-230-R04 (planned 06/2022)',
      dateDCR: '26/11/2019',
      taxe: 5,
      montant: 1120200,
      noFacture: '90127935',
      pspcClaimNumber: '97',
      montantTTC: 1176210,
      ligneSAP: 'Err 520',
      c228: 0,
      c229: 0,
      c230: 1120200,
      c231: 0
    },
    {
      id: 66,
      numeroEtape: 'DCR 015',
      noJalon: '004',
      dateFacture: '',
      description: 'DCR 015-230-R04',
      dateDCR: '26/11/2019',
      taxe: 14,
      montant: 1092200,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 1245108,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 1092200,
      c231: 0
    },
    {
      id: 67,
      numeroEtape: 'DCR 015',
      noJalon: '005',
      dateFacture: '',
      description: 'DCR 015-231-R04',
      dateDCR: '26/11/2019',
      taxe: 14,
      montant: 1092200,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 1245108,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 1092200
    },
    // DCR 016
    {
      id: 68,
      numeroEtape: 'DCR 016',
      noJalon: '001',
      dateFacture: '01-01-2021',
      description: 'Deck crane upgrade - Engineering cost DCR 016-ENG Deck crane upgrade - Engineering cost DCR 016-ENG',
      dateDCR: '26/11/2019',
      taxe: 5,
      montant: 1890000,
      noFacture: 'Fact90071498',
      pspcClaimNumber: '38',
      montantTTC: 1984500,
      ligneSAP: 'Err 520',
      c228: 1890000,
      c229: 0,
      c230: 0,
      c231: 0
    },
    {
      id: 69,
      numeroEtape: 'DCR 016',
      noJalon: '002',
      dateFacture: '',
      description: 'DCR 016-229 (planned 06/2022)',
      dateDCR: '26/11/2019',
      taxe: 5,
      montant: 2823032,
      noFacture: '90120540',
      pspcClaimNumber: '85',
      montantTTC: 2964184,
      ligneSAP: 'Err 520',
      c228: 0,
      c229: 2823032,
      c230: 0,
      c231: 0
    },
    {
      id: 70,
      numeroEtape: 'DCR 016',
      noJalon: '003',
      dateFacture: '18-12-2023',
      description: 'DCR 016-230 (planned 06/2022)',
      dateDCR: '26/11/2019',
      taxe: 5,
      montant: 2679112,
      noFacture: '90128568',
      pspcClaimNumber: '99',
      montantTTC: 2813068,
      ligneSAP: 'Err 520',
      c228: 0,
      c229: 0,
      c230: 2679112,
      c231: 0
    },
    {
      id: 71,
      numeroEtape: 'DCR 016',
      noJalon: '004',
      dateFacture: '',
      description: 'DCR 016-230',
      dateDCR: '26/11/2019',
      taxe: 14,
      montant: 2679112,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 3054188,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 2679112,
      c231: 0
    },
    {
      id: 72,
      numeroEtape: 'DCR 016',
      noJalon: '005',
      dateFacture: '',
      description: 'DCR 016-231',
      dateDCR: '26/11/2019',
      taxe: 14,
      montant: 2679112,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 3054188,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 2679112
    },
    // DCR 017
    {
      id: 73,
      numeroEtape: 'DCR 017',
      noJalon: '001',
      dateFacture: '26-05-2021',
      description: 'DCR 017-ENG EARLY ORDER OF MATERIAL ASSESSMENT DCR 017-ENG EARLY ORDER OF MATERIAL ASSESSMENT',
      dateDCR: '15/06/2020',
      taxe: 5,
      montant: 6818000,
      noFacture: '90071521',
      pspcClaimNumber: '39',
      montantTTC: 7158900,
      ligneSAP: 'Err 520',
      c228: 6818000,
      c229: 0,
      c230: 0,
      c231: 0
    },
    {
      id: 74,
      numeroEtape: 'DCR 017',
      noJalon: '002',
      dateFacture: '24-05-2022',
      description: 'DCR 017-229',
      dateDCR: '01/06/2020',
      taxe: 5,
      montant: 13433365,
      noFacture: '90095405',
      pspcClaimNumber: '54',
      montantTTC: 14105034,
      ligneSAP: 'Err 520',
      c228: 0,
      c229: 13433365,
      c230: 0,
      c231: 0
    },
    {
      id: 75,
      numeroEtape: 'DCR 017',
      noJalon: '003',
      dateFacture: '24-05-2022',
      description: 'DCR 017-230',
      dateDCR: '01/06/2020',
      taxe: 5,
      montant: 14995842,
      noFacture: '90095405',
      pspcClaimNumber: '54',
      montantTTC: 15745634,
      ligneSAP: 'Err 520',
      c228: 0,
      c229: 0,
      c230: 14995842,
      c231: 0
    },
    // DCR 018
    {
      id: 76,
      numeroEtape: 'DCR 018',
      noJalon: '001',
      dateFacture: '',
      description: 'COVID - 229, 230 - montant insuffisant fin period mai 2022',
      dateDCR: '2020-11-16',
      taxe: 0,
      montant: 0,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 0,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 0
    },
    {
      id: 77,
      numeroEtape: 'DCR 018',
      noJalon: '002',
      dateFacture: '17-03-2022',
      description: 'Période du 16 novembre au 31 mars 2021',
      dateDCR: '2021-12-17',
      taxe: 5,
      montant: 12550066,
      noFacture: '90092124',
      pspcClaimNumber: '51',
      montantTTC: 13177569,
      ligneSAP: 'Err 520',
      c228: 0,
      c229: 12550066,
      c230: 0,
      c231: 0
    },
    {
      id: 78,
      numeroEtape: 'DCR 018',
      noJalon: '003',
      dateFacture: '17-03-2022',
      description: 'Période du 1 avril au 28 février 2022',
      dateDCR: '2022-03-17',
      taxe: 5,
      montant: 40007711,
      noFacture: '90092124',
      pspcClaimNumber: '51',
      montantTTC: 42008097,
      ligneSAP: 'Err 520',
      c228: 0,
      c229: 0,
      c230: 40007711,
      c231: 0
    },
    {
      id: 79,
      numeroEtape: 'DCR 018',
      noJalon: '004',
      dateFacture: '13-04-2022',
      description: 'Période mars 2022',
      dateDCR: '2022-04-13',
      taxe: 5,
      montant: 6128717,
      noFacture: '90093414',
      pspcClaimNumber: '52',
      montantTTC: 6435153,
      ligneSAP: 'Err 520',
      c228: 0,
      c229: 0,
      c230: 6128717,
      c231: 0
    },
    {
      id: 80,
      numeroEtape: 'DCR 018',
      noJalon: '005',
      dateFacture: '19-05-2022',
      description: 'Période avril 2022',
      dateDCR: '2022-05-19',
      taxe: 5,
      montant: 7465220,
      noFacture: '90095278',
      pspcClaimNumber: '53',
      montantTTC: 7838481,
      ligneSAP: 'Err 520',
      c228: 0,
      c229: 0,
      c230: 7465220,
      c231: 0
    },
    {
      id: 81,
      numeroEtape: 'DCR 018',
      noJalon: '006',
      dateFacture: '26-05-2022',
      description: 'Période mai 2022',
      dateDCR: '2022-05-26',
      taxe: 5,
      montant: 5733065,
      noFacture: '90095535',
      pspcClaimNumber: '56',
      montantTTC: 6019718,
      ligneSAP: 'Err 520',
      c228: 0,
      c229: 0,
      c230: 5733065,
      c231: 0
    },
    // DCR 020
    {
      id: 82,
      numeroEtape: 'DCR 020',
      noJalon: '001',
      dateFacture: '',
      description: 'DCR 020 COVID-19 Subcontractor Cost Assistance 336233.75 Jusqua 1 M$',
      dateDCR: '2022-01-20',
      taxe: 5,
      montant: 0,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 0,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 0
    },
    {
      id: 83,
      numeroEtape: 'DCR 020',
      noJalon: '002',
      dateFacture: '23-08-2022',
      description: 'Janvier à mars',
      dateDCR: '2022-01-20',
      taxe: 5,
      montant: 97727216,
      noFacture: '90098775',
      pspcClaimNumber: '67',
      montantTTC: 102613577,
      ligneSAP: 'Err 520',
      c228: 0,
      c229: 0,
      c230: 97727216,
      c231: 0
    },
    {
      id: 84,
      numeroEtape: 'DCR 020',
      noJalon: '003',
      dateFacture: '27-10-2022',
      description: 'Avril à juillet',
      dateDCR: '2022-01-20',
      taxe: 5,
      montant: 149278645,
      noFacture: '90104432',
      pspcClaimNumber: '73',
      montantTTC: 156742577,
      ligneSAP: 'Err 520',
      c228: 0,
      c229: 0,
      c230: 149278645,
      c231: 0
    },
    {
      id: 85,
      numeroEtape: 'DCR 020',
      noJalon: '004',
      dateFacture: '10-11-2022',
      description: 'Juillet',
      dateDCR: '2022-01-20',
      taxe: 5,
      montant: 48530591,
      noFacture: '90105532',
      pspcClaimNumber: '75',
      montantTTC: 50957121,
      ligneSAP: 'Err 520',
      c228: 0,
      c229: 0,
      c230: 48530591,
      c231: 0
    },
    {
      id: 86,
      numeroEtape: 'DCR 020',
      noJalon: '005',
      dateFacture: '15-12-2022',
      description: 'Août',
      dateDCR: '2022-01-20',
      taxe: 5,
      montant: 56034125,
      noFacture: '90107784',
      pspcClaimNumber: '76',
      montantTTC: 58835831,
      ligneSAP: 'Err 520',
      c228: 0,
      c229: 0,
      c230: 56034125,
      c231: 0
    },
    // DCR-221
    {
      id: 87,
      numeroEtape: 'DCR-221',
      noJalon: '001',
      dateFacture: '',
      description: 'Early Delivery NLT3 and NLT4',
      dateDCR: '2023-04-11',
      taxe: 0,
      montant: 0,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 0,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 0
    },
    // DCR-21
    {
      id: 88,
      numeroEtape: 'DCR-21',
      noJalon: '4528',
      dateFacture: '17-01-2025',
      description: 'Transportation to Equipment C-228',
      dateDCR: '05-06-2023',
      taxe: 5,
      montant: 53497777,
      noFacture: '90131504',
      pspcClaimNumber: '127',
      montantTTC: 56172666,
      ligneSAP: 'Err 520',
      c228: 53497777,
      c229: 0,
      c230: 0,
      c231: 0
    },
    {
      id: 89,
      numeroEtape: 'DCR-21',
      noJalon: '4529',
      dateFacture: '17-01-2025',
      description: 'Transportation to Equipment C-229',
      dateDCR: '05-06-2023',
      taxe: 5,
      montant: 53497777,
      noFacture: '90131504',
      pspcClaimNumber: '127',
      montantTTC: 56172666,
      ligneSAP: 'Err 520',
      c228: 0,
      c229: 53497777,
      c230: 0,
      c231: 0
    },
    // DCR-22
    {
      id: 90,
      numeroEtape: 'DCR-22',
      noJalon: '3504',
      dateFacture: '',
      description: 'Technical Data Partitioning according CSP-01',
      dateDCR: '22-07-2022',
      taxe: 5,
      montant: 462000,
      noFacture: '90130356',
      pspcClaimNumber: '103',
      montantTTC: 485100,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 462000
    },
    // DCR-23
    {
      id: 91,
      numeroEtape: 'DCR-23',
      noJalon: '',
      dateFacture: '14-01-2021',
      description: 'Cooler training to subcontractor DCR 025-ENG-R01 Cooler training to subcontractor DCR 025-ENG-R01',
      dateDCR: '18/11/2019',
      taxe: 5,
      montant: 1840000,
      noFacture: 'Fact90071498',
      pspcClaimNumber: '38',
      montantTTC: 1932000,
      ligneSAP: 'Err 520',
      c228: 1840000,
      c229: 0,
      c230: 0,
      c231: 0
    },
    {
      id: 92,
      numeroEtape: 'DCR-23',
      noJalon: '',
      dateFacture: '02-06-2023',
      description: 'DCR-025-229 (planned 10/2021)',
      dateDCR: '01/06/2020',
      taxe: 5,
      montant: 10350166,
      noFacture: '90096665',
      pspcClaimNumber: '58',
      montantTTC: 10867674,
      ligneSAP: 'Err 520',
      c228: 0,
      c229: 10350166,
      c230: 0,
      c231: 0
    },
    {
      id: 93,
      numeroEtape: 'DCR-23',
      noJalon: '',
      dateFacture: '02-06-2022',
      description: 'DCR-025-230 (planned 02/2022)',
      dateDCR: '01/06/2020',
      taxe: 5,
      montant: 9599834,
      noFacture: '90096665',
      pspcClaimNumber: '58',
      montantTTC: 10079826,
      ligneSAP: 'Err 520',
      c228: 0,
      c229: 0,
      c230: 9599834,
      c231: 0
    },
    {
      id: 94,
      numeroEtape: 'DCR-23',
      noJalon: '',
      dateFacture: '',
      description: 'DCR-025-230',
      dateDCR: '01/06/2020',
      taxe: 14,
      montant: 8959834,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 10214111,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 8959834,
      c231: 0
    },
    {
      id: 95,
      numeroEtape: 'DCR-23',
      noJalon: '',
      dateFacture: '',
      description: 'DCR-025-231',
      dateDCR: '01/06/2020',
      taxe: 14,
      montant: 10350166,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 11799189,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 10350166
    },
    // DCR-24
    {
      id: 96,
      numeroEtape: 'DCR-24',
      noJalon: '',
      dateFacture: '',
      description: 'DCR-026 Relocation and sizing of bollards',
      dateDCR: '',
      taxe: 0,
      montant: 0,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 0,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 0
    },
    // DCR-25
    {
      id: 97,
      numeroEtape: 'DCR-25',
      noJalon: '',
      dateFacture: '26-05-2021',
      description: 'DCR 027-ENG Gear waste treatment capabilities DCR 027-ENG Gear waste treatment capabilities',
      dateDCR: '09/12/2019',
      taxe: 5,
      montant: 1477000,
      noFacture: 'Fact90071498',
      pspcClaimNumber: '38',
      montantTTC: 1550850,
      ligneSAP: 'Err 520',
      c228: 1477000,
      c229: 0,
      c230: 0,
      c231: 0
    },
    {
      id: 98,
      numeroEtape: 'DCR-25',
      noJalon: '',
      dateFacture: '20-07-2022',
      description: 'DCR-027-229',
      dateDCR: '09/12/2019',
      taxe: 5,
      montant: 4497618,
      noFacture: '90098706',
      pspcClaimNumber: '66',
      montantTTC: 4722499,
      ligneSAP: 'Err 520',
      c228: 0,
      c229: 4497618,
      c230: 0,
      c231: 0
    },
    {
      id: 99,
      numeroEtape: 'DCR-25',
      noJalon: '',
      dateFacture: '07-12-2023',
      description: 'DCR-027-230',
      dateDCR: '09/12/2019',
      taxe: 5,
      montant: 4036013,
      noFacture: '90128412',
      pspcClaimNumber: '100',
      montantTTC: 4237814,
      ligneSAP: 'Err 520',
      c228: 0,
      c229: 0,
      c230: 4036013,
      c231: 0
    },
    {
      id: 100,
      numeroEtape: 'DCR-25',
      noJalon: '',
      dateFacture: '',
      description: 'DCR-027-230',
      dateDCR: '09/12/2019',
      taxe: 14,
      montant: 4036013,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 4601055,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 4036013,
      c231: 0
    },
    {
      id: 101,
      numeroEtape: 'DCR-25',
      noJalon: '',
      dateFacture: '',
      description: 'DCR-027-231',
      dateDCR: '09/12/2019',
      taxe: 14,
      montant: 4036013,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 4601055,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 4036013
    },
    // DCR-26
    {
      id: 102,
      numeroEtape: 'DCR-26',
      noJalon: '',
      dateFacture: '17-01-2025',
      description: 'DCR-028 Winches Upgrade C-228',
      dateDCR: '19-06-2023',
      taxe: 5,
      montant: 50586134,
      noFacture: '90131572',
      pspcClaimNumber: '128',
      montantTTC: 53115441,
      ligneSAP: 'Err 520',
      c228: 50586134,
      c229: 0,
      c230: 0,
      c231: 0
    },
    {
      id: 103,
      numeroEtape: 'DCR-26',
      noJalon: '',
      dateFacture: '17-01-2025',
      description: 'DCR-028 Winches Upgrade C-229',
      dateDCR: '19-06-2023',
      taxe: 5,
      montant: 45717948,
      noFacture: '90131573',
      pspcClaimNumber: '129',
      montantTTC: 48003845,
      ligneSAP: 'Err 520',
      c228: 0,
      c229: 45717948,
      c230: 0,
      c231: 0
    },
    {
      id: 104,
      numeroEtape: 'DCR-26',
      noJalon: '',
      dateFacture: '',
      description: 'DCR-028 Winches Upgrade C-230',
      dateDCR: '19-06-2023',
      taxe: 14,
      montant: 89607110,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 102152105,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 89607110,
      c231: 0
    },
    {
      id: 105,
      numeroEtape: 'DCR-26',
      noJalon: '',
      dateFacture: '',
      description: 'DCR-028 Winches Upgrade C-231',
      dateDCR: '19-06-2023',
      taxe: 14,
      montant: 97381339,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 110994726,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 97381339
    },
    // DCR-27
    {
      id: 106,
      numeroEtape: 'DCR-27',
      noJalon: '',
      dateFacture: '',
      description: 'DCR-029 Z-Drive Maintenance C-228',
      dateDCR: '',
      taxe: 5,
      montant: 0,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 0,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 0
    },
    {
      id: 107,
      numeroEtape: 'DCR-27',
      noJalon: '',
      dateFacture: '',
      description: 'DCR-029 Z-Drive Maintenance C-229',
      dateDCR: '',
      taxe: 5,
      montant: 0,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 0,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 0
    },
    // DCR-28
    {
      id: 108,
      numeroEtape: 'DCR-28',
      noJalon: '',
      dateFacture: '',
      description: 'DCR-030 Subcontractor cost',
      dateDCR: '',
      taxe: 5,
      montant: 0,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 0,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 0
    },
    // DCR-29
    {
      id: 109,
      numeroEtape: 'DCR-29',
      noJalon: '',
      dateFacture: '',
      description: 'DCR-031 NLT Extension',
      dateDCR: '',
      taxe: 5,
      montant: 0,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 0,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 0
    },
    // DCR-30
    {
      id: 110,
      numeroEtape: 'DCR-30',
      noJalon: '',
      dateFacture: '',
      description: 'DCR-032 Modification of Chart Table C-230',
      dateDCR: '',
      taxe: 14,
      montant: 1055840,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 1203658,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 1055840,
      c231: 0
    },
    {
      id: 111,
      numeroEtape: 'DCR-30',
      noJalon: '',
      dateFacture: '',
      description: 'DCR-032 Modification of Chart Table C-231',
      dateDCR: '',
      taxe: 14,
      montant: 711327,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 810472,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 711327
    },
    // DCR-31
    {
      id: 112,
      numeroEtape: 'DCR-31',
      noJalon: '',
      dateFacture: '',
      description: 'DCR-033 Bilge Wells in UT C-230',
      dateDCR: '',
      taxe: 14,
      montant: 1431630,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 1632058,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 1431630,
      c231: 0
    },
    {
      id: 113,
      numeroEtape: 'DCR-31',
      noJalon: '',
      dateFacture: '',
      description: 'DCR-033 Bilge Wells in UT C-231',
      dateDCR: '',
      taxe: 14,
      montant: 1317820,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 1502115,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 1317820
    },
    // DCR-32
    {
      id: 114,
      numeroEtape: 'DCR-32',
      noJalon: '',
      dateFacture: '03-12-2024',
      description: 'DCR-034 Change Hatch in UT C-230',
      dateDCR: '',
      taxe: 14,
      montant: 3293091,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 3754124,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 3293091,
      c231: 0
    },
    {
      id: 115,
      numeroEtape: 'DCR-32',
      noJalon: '',
      dateFacture: '03-12-2024',
      description: 'DCR-034 Change Hatch in UT C-231',
      dateDCR: '',
      taxe: 14,
      montant: 1482024,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 1689507,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 1482024
    },
    // DCR-33
    {
      id: 116,
      numeroEtape: 'DCR-33',
      noJalon: '',
      dateFacture: '',
      description: 'DCR-035 Magnetic compass sonde C-230',
      dateDCR: '',
      taxe: 14,
      montant: 719459,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 820183,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 719459,
      c231: 0
    },
    {
      id: 117,
      numeroEtape: 'DCR-33',
      noJalon: '',
      dateFacture: '',
      description: 'DCR-035 Magnetic compass sonde C-231',
      dateDCR: '',
      taxe: 14,
      montant: 719459,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 820183,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 719459
    },
    // DCR-34
    {
      id: 118,
      numeroEtape: 'DCR-34',
      noJalon: '',
      dateFacture: '',
      description: 'DCR-036 ECDIS Battery backup C-230',
      dateDCR: '',
      taxe: 14,
      montant: 1533067,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 1747696,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 1533067,
      c231: 0
    },
    {
      id: 119,
      numeroEtape: 'DCR-34',
      noJalon: '',
      dateFacture: '',
      description: 'DCR-036 ECDIS Battery backup C-231',
      dateDCR: '',
      taxe: 14,
      montant: 856264,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 976141,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 856264
    },
    // DCR-35
    {
      id: 120,
      numeroEtape: 'DCR-35',
      noJalon: '',
      dateFacture: '',
      description: 'DCR-037 Fender modification C-230',
      dateDCR: '',
      taxe: 14,
      montant: 0,
      noFacture: '90157543',
      pspcClaimNumber: '132',
      montantTTC: 0,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 0
    },
    {
      id: 121,
      numeroEtape: 'DCR-35',
      noJalon: '4696',
      dateFacture: '06-05-2025',
      description: 'DCR-037 Fender modification C-230',
      dateDCR: '',
      taxe: 14,
      montant: 790300,
      noFacture: '90157382',
      pspcClaimNumber: '135',
      montantTTC: 900542,
      ligneSAP: 'Err 520',
      c228: 0,
      c229: 0,
      c230: 790300,
      c231: 0
    },
    {
      id: 122,
      numeroEtape: 'DCR-35',
      noJalon: '',
      dateFacture: '',
      description: 'DCR-037 Fender modification C-231',
      dateDCR: '',
      taxe: 14,
      montant: 296500,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 338010,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 296500
    },
    // DCR-36
    {
      id: 123,
      numeroEtape: 'DCR-36',
      noJalon: '',
      dateFacture: '',
      description: 'DCR-38 Change of Shelves C-230',
      dateDCR: '',
      taxe: 14,
      montant: 815300,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 929670,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 815300,
      c231: 0
    },
    // DCR-37
    {
      id: 124,
      numeroEtape: 'DCR-37',
      noJalon: '',
      dateFacture: '',
      description: 'DCR-38 Change of Shelves C-231',
      dateDCR: '',
      taxe: 14,
      montant: 744400,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 848616,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 744400
    },
    // DCR-38
    {
      id: 125,
      numeroEtape: 'DCR-38',
      noJalon: '',
      dateFacture: '09-05-2025',
      description: 'DCR-39 Additional charge C-230',
      dateDCR: '',
      taxe: 14,
      montant: 1591562,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 1814381,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 1591562,
      c231: 0
    },
    // DCR-39
    {
      id: 126,
      numeroEtape: 'DCR-39',
      noJalon: '',
      dateFacture: '09-05-2025',
      description: 'DCR-39 Additional charge C-231',
      dateDCR: '',
      taxe: 14,
      montant: 2444069,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 2786239,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 2444069
    },
    // DCR-40
    {
      id: 127,
      numeroEtape: 'DCR-40',
      noJalon: '',
      dateFacture: '23-06-2025',
      description: 'DCR-40 Laptop for remote service C-230',
      dateDCR: '',
      taxe: 14,
      montant: 1383600,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 1577304,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 1383600,
      c231: 0
    },
    // DCR-41
    {
      id: 128,
      numeroEtape: 'DCR-41',
      noJalon: '',
      dateFacture: '23-06-2025',
      description: 'DCR-40 Laptop for remote service C-231',
      dateDCR: '',
      taxe: 14,
      montant: 1116200,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 1272668,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 1116200
    },
    // DCR-42
    {
      id: 129,
      numeroEtape: 'DCR-42',
      noJalon: '',
      dateFacture: '09-08-2025',
      description: 'DCR-43 New breathing air compressor C-230',
      dateDCR: '',
      taxe: 14,
      montant: 4391085,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 5005837,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 4391085,
      c231: 0
    },
    {
      id: 130,
      numeroEtape: 'DCR-42',
      noJalon: '',
      dateFacture: '09-08-2025',
      description: 'DCR-43 New breathing air compressor C-231',
      dateDCR: '',
      taxe: 14,
      montant: 3283026,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 3742650,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 3283026
    },
    {
      id: 131,
      numeroEtape: 'DCR-43',
      noJalon: '',
      dateFacture: '19-08-2025',
      description: 'DCR-44 New TV Satellite antenna C-230',
      dateDCR: '',
      taxe: 14,
      montant: 2923821,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 3333156,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 2923821,
      c231: 0
    },
    {
      id: 132,
      numeroEtape: 'DCR-44',
      noJalon: '',
      dateFacture: '19-08-2025',
      description: 'DCR-44 New TV Satellite antenna C-231',
      dateDCR: '',
      taxe: 14,
      montant: 1573609,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 1793914,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 1573609
    }
  ])

  // Synchroniser les données avec le contexte global
  useEffect(() => {
    // Convertir les données en format compatible avec le contexte
    const milestonesForContext = milestonesFactures.map(m => ({
      id: m.id.toString(),
      numeroEtape: m.numeroEtape,
      description: m.description,
      montant: m.montantFacture,
      dateEcheance: new Date(),
      statut: m.noFacture ? 'Facturé' : 'En attente' as 'En attente' | 'Facturé' | 'Payé',
      numeroFacture: m.noFacture,
      dateFacturation: m.dateFacture ? new Date(m.dateFacture) : undefined
    }))

    const dcrsForContext = dcrFactures.map(d => ({
      id: d.id.toString(),
      numeroEtape: d.numeroEtape,
      description: d.description,
      montant: d.montant,
      dateEcheance: new Date(),
      statut: d.noFacture ? 'Facturé' : 'En attente' as 'En attente' | 'Facturé' | 'Payé',
      numeroFacture: d.noFacture,
      dateFacturation: d.dateFacture ? new Date(d.dateFacture) : undefined
    }))

    setMilestones(milestonesForContext)
    setDcrs(dcrsForContext)
  }, [milestonesFactures, dcrFactures, setMilestones, setDcrs])

  // Fonction de formatage des devises
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 2
    }).format(amount)
  }

  // Fonction pour déterminer si une ligne est facturée
  const isFactured = (noFacture: string) => {
    return noFacture && noFacture.trim() !== ''
  }

  // Fonction pour valider qu'une ligne est complète
  const isLineComplete = (item: MilestoneFacturation | DCRFacturation) => {
    // Vérifier les champs obligatoires
    const hasDescription = item.description && item.description.trim() !== ''
    const hasDateFacture = item.dateFacture && item.dateFacture.trim() !== ''
    const hasMontant = 'montant' in item ? (item.montant !== null && item.montant !== undefined) : true
    const hasTaxe = 'taxe' in item ? (item.taxe !== null && item.taxe !== undefined) : true
    
    // Si facturé, doit avoir un numéro de facture
    if (isFactured(item.noFacture)) {
      return hasDescription && hasDateFacture && hasMontant && hasTaxe
    } else {
      // Si non facturé, peut être sans date de facture mais doit avoir les autres champs
      return hasDescription && hasMontant && hasTaxe
    }
  }

  // Fonction pour obtenir les classes CSS d'une ligne
  const getRowClasses = (item: MilestoneFacturation | DCRFacturation) => {
    const baseClasses = "border-b border-gray-200 hover:bg-gray-50"
    const factured = isFactured(item.noFacture)
    const complete = isLineComplete(item)
    
    if (factured) {
      return `${baseClasses} bg-purple-100 hover:bg-purple-150`
    } else if (!complete) {
      return `${baseClasses} bg-yellow-100 hover:bg-yellow-150 border-yellow-300`
    }
    return baseClasses
  }

  // Fonctions CRUD pour les milestones
  const addMilestone = () => {
    const newId = Math.max(...milestonesFactures.map(m => m.id), 0) + 1
    const newMilestone: MilestoneFacturation = {
      id: newId,
      numeroEtape: '',
      noJalon: '',
      dateFacture: '',
      description: '',
      taxe: 5,
      montantFacture: 0,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 0,
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 0
    }
    setMilestonesFactures(prev => [...prev, newMilestone])
  }

  const updateMilestone = (id: number, field: keyof MilestoneFacturation, value: any) => {
    setMilestonesFactures(prev => prev.map(milestone => {
      if (milestone.id === id) {
        const updated = { ...milestone, [field]: value }
        // Recalcul automatique du TTC si montant ou taxe change
        if (field === 'montantFacture' || field === 'taxe') {
          updated.montantTTC = updated.montantFacture * (1 + updated.taxe / 100)
        }
        return updated
      }
      return milestone
    }))
  }

  const deleteMilestone = (id: number) => {
    setMilestonesFactures(prev => prev.filter(milestone => milestone.id !== id))
  }

  // Fonctions CRUD pour les DCR
  const addDCR = () => {
    const newId = Math.max(...dcrFactures.map(d => d.id), 0) + 1
    const newDCR: DCRFacturation = {
      id: newId,
      numeroEtape: '',
      noJalon: '',
      dateFacture: '',
      description: '',
      dateDCR: '',
      taxe: 5,
      montant: 0,
      noFacture: '',
      pspcClaimNumber: '',
      montantTTC: 0,
      ligneSAP: '',
      c228: 0,
      c229: 0,
      c230: 0,
      c231: 0
    }
    setDCRFactures(prev => [...prev, newDCR])
  }

  const updateDCR = (id: number, field: keyof DCRFacturation, value: any) => {
    setDCRFactures(prev => prev.map(dcr => {
      if (dcr.id === id) {
        const updated = { ...dcr, [field]: value }
        // Recalcul automatique du TTC si montant ou taxe change
        if (field === 'montant' || field === 'taxe') {
          updated.montantTTC = updated.montant * (1 + updated.taxe / 100)
        }
        return updated
      }
      return dcr
    }))
  }

  const deleteDCR = (id: number) => {
    setDCRFactures(prev => prev.filter(dcr => dcr.id !== id))
  }

  // Fonctions de calcul des totaux pour les tableaux individuels
  const calculateMilestoneTableTotals = () => {
    const montantFacture = milestonesFactures.reduce((sum, m) => sum + m.montantFacture, 0)
    const montantTTC = milestonesFactures.reduce((sum, m) => sum + m.montantTTC, 0)
    const c228 = milestonesFactures.reduce((sum, m) => sum + m.c228, 0)
    const c229 = milestonesFactures.reduce((sum, m) => sum + m.c229, 0)
    const c230 = milestonesFactures.reduce((sum, m) => sum + m.c230, 0)
    const c231 = milestonesFactures.reduce((sum, m) => sum + m.c231, 0)
    
    return { montantFacture, montantTTC, c228, c229, c230, c231 }
  }

  const calculateDCRTableTotals = () => {
    const montantFacture = dcrFactures.reduce((sum, d) => sum + d.montant, 0)
    const montantTTC = dcrFactures.reduce((sum, d) => sum + d.montantTTC, 0)
    const c228 = dcrFactures.reduce((sum, d) => sum + d.c228, 0)
    const c229 = dcrFactures.reduce((sum, d) => sum + d.c229, 0)
    const c230 = dcrFactures.reduce((sum, d) => sum + d.c230, 0)
    const c231 = dcrFactures.reduce((sum, d) => sum + d.c231, 0)
    
    return { montantFacture, montantTTC, c228, c229, c230, c231 }
  }

  // Calculs pour le bilan
  const totalMilestonesFactures = milestonesFactures.reduce((sum, m) => sum + m.montantFacture, 0)
  const totalDCRFactures = dcrFactures.reduce((sum, d) => sum + d.montant, 0)
  const totalFacturesAvantTaxes = totalMilestonesFactures + totalDCRFactures
  const totalFacturesAvecTaxes = milestonesFactures.reduce((sum, m) => sum + m.montantTTC, 0) + 
                                   dcrFactures.reduce((sum, d) => sum + d.montantTTC, 0)

  // Calculs par projet
  const totauxParProjet = {
    c228: milestonesFactures.reduce((sum, m) => sum + m.c228, 0) + dcrFactures.reduce((sum, d) => sum + d.c228, 0),
    c229: milestonesFactures.reduce((sum, m) => sum + m.c229, 0) + dcrFactures.reduce((sum, d) => sum + d.c229, 0),
    c230: milestonesFactures.reduce((sum, m) => sum + m.c230, 0) + dcrFactures.reduce((sum, d) => sum + d.c230, 0),
    c231: milestonesFactures.reduce((sum, m) => sum + m.c231, 0) + dcrFactures.reduce((sum, d) => sum + d.c231, 0)
  }

  const tabs = [
    { id: 'milestones', label: 'Registre Milestones', icon: '📋' },
    { id: 'dcr', label: 'Registre DCR', icon: '📊' },
    { id: 'bilan', label: 'Bilan de Facturation', icon: '💰' },
    { id: 'kpi', label: 'Indicateurs Clés', icon: '📈' }
  ]

  return (
    <div className="w-full space-y-6">
      {/* Navigation par onglets */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="flex items-center gap-2">
                <span>{tab.icon}</span>
                {tab.label}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Contenu des onglets */}
      {activeTab === 'milestones' && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
            <h2 className="text-2xl font-bold flex items-center">
              📋 Registre des Milestones
            </h2>
            <p className="mt-2 text-blue-100">Gestion des facturations par jalons de projets</p>
          </div>
          
          {/* Légende */}
          <div className="bg-gray-50 p-4 border-b">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Légende:</h3>
            <div className="flex flex-wrap gap-4 text-xs">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-purple-100 border border-purple-200 mr-2 rounded"></div>
                <span className="text-gray-600">Facturé (avec n° de facture)</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-white border border-gray-200 mr-2 rounded"></div>
                <span className="text-gray-600">Non facturé</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 mr-2 rounded"></div>
                <span className="text-gray-600">⚠️ Données incomplètes</span>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    # de l&apos;étape
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    No Jalon
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Facture
                  </th>
                  <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[500px]">
                    Description
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Taxe
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[140px]">
                    Montant Facturé
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    No. Facture
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    PSPC Claim #
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">
                    Montant TTC
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">
                    C-228
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">
                    C-229
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">
                    C-230
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">
                    C-231
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Documents
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {milestonesFactures.map((milestone) => (
                  <tr key={milestone.id} className={getRowClasses(milestone)}>
                    <td className="px-2 py-2 whitespace-nowrap">
                      <input
                        type="text"
                        value={milestone.numeroEtape}
                        onChange={(e) => updateMilestone(milestone.id, 'numeroEtape', e.target.value)}
                        className="w-16 text-xs border border-gray-300 rounded px-2 py-1"
                        placeholder="001"
                      />
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap">
                      <input
                        type="text"
                        value={milestone.noJalon}
                        onChange={(e) => updateMilestone(milestone.id, 'noJalon', e.target.value)}
                        className="w-20 text-xs border border-gray-300 rounded px-2 py-1"
                        placeholder="J###"
                      />
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap">
                      <input
                        type="text"
                        value={milestone.dateFacture}
                        onChange={(e) => updateMilestone(milestone.id, 'dateFacture', e.target.value)}
                        className="w-24 text-xs border border-gray-300 rounded px-2 py-1"
                        placeholder="YYYY-MM-DD"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        value={milestone.description}
                        onChange={(e) => updateMilestone(milestone.id, 'description', e.target.value)}
                        className="w-full text-sm border border-gray-300 rounded px-3 py-1"
                        placeholder="Description détaillée du jalon..."
                      />
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap">
                      <input
                        type="number"
                        value={milestone.taxe}
                        onChange={(e) => updateMilestone(milestone.id, 'taxe', parseFloat(e.target.value) || 0)}
                        className="w-16 text-xs border border-gray-300 rounded px-2 py-1"
                        min="0"
                        max="100"
                        placeholder="5"
                      />
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap">
                      <input
                        type="number"
                        value={milestone.montantFacture}
                        onChange={(e) => updateMilestone(milestone.id, 'montantFacture', parseFloat(e.target.value) || 0)}
                        className="w-32 text-xs border border-gray-300 rounded px-2 py-1"
                        step="0.01"
                        placeholder="0.00"
                      />
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap">
                      <input
                        type="text"
                        value={milestone.noFacture}
                        onChange={(e) => updateMilestone(milestone.id, 'noFacture', e.target.value)}
                        className="w-24 text-xs border border-gray-300 rounded px-2 py-1"
                        placeholder="OF-###"
                      />
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap">
                      <input
                        type="text"
                        value={milestone.pspcClaimNumber}
                        onChange={(e) => updateMilestone(milestone.id, 'pspcClaimNumber', e.target.value)}
                        className="w-24 text-xs border border-gray-300 rounded px-2 py-1"
                        placeholder="PSPC-###"
                      />
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap">
                      <span className="text-sm font-medium text-green-600">
                        {formatCurrency(milestone.montantTTC)}
                      </span>
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap">
                      <input
                        type="number"
                        value={milestone.c228}
                        onChange={(e) => updateMilestone(milestone.id, 'c228', parseFloat(e.target.value) || 0)}
                        className="w-24 text-xs border border-gray-300 rounded px-2 py-1"
                        step="0.01"
                        placeholder="0.00"
                      />
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap">
                      <input
                        type="number"
                        value={milestone.c229}
                        onChange={(e) => updateMilestone(milestone.id, 'c229', parseFloat(e.target.value) || 0)}
                        className="w-24 text-xs border border-gray-300 rounded px-2 py-1"
                        step="0.01"
                        placeholder="0.00"
                      />
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap">
                      <input
                        type="number"
                        value={milestone.c230}
                        onChange={(e) => updateMilestone(milestone.id, 'c230', parseFloat(e.target.value) || 0)}
                        className="w-24 text-xs border border-gray-300 rounded px-2 py-1"
                        step="0.01"
                        placeholder="0.00"
                      />
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap">
                      <input
                        type="number"
                        value={milestone.c231}
                        onChange={(e) => updateMilestone(milestone.id, 'c231', parseFloat(e.target.value) || 0)}
                        className="w-24 text-xs border border-gray-300 rounded px-2 py-1"
                        step="0.01"
                        placeholder="0.00"
                      />
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <button
                        onClick={() => {
                          // Naviguer vers l'onglet Documents et sélectionner le dossier
                          const event = new CustomEvent('openDocumentFolder', {
                            detail: { type: 'milestone', id: milestone.id, name: `${milestone.numeroEtape} - ${milestone.description}` }
                          });
                          window.dispatchEvent(event);
                        }}
                        className="flex items-center text-blue-600 hover:text-blue-900 text-sm bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded"
                        title="Voir les documents"
                      >
                        <EyeIcon className="w-4 h-4 mr-1" />
                        <span className="text-xs">Docs</span>
                        <span className="ml-1 bg-blue-200 text-blue-800 text-xs rounded-full px-1">
                          {getDocumentsForItem('milestone', milestone.id.toString()).length}
                        </span>
                      </button>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <button
                        onClick={() => deleteMilestone(milestone.id)}
                        className="text-red-600 hover:text-red-900 text-sm"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-6 bg-gray-50 border-t">
            <button
              onClick={addMilestone}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2"
            >
              ➕ Ajouter un Milestone
            </button>
          </div>

          {/* Fenêtre de Totaux Milestones */}
          <div className="bg-blue-50 border-t-2 border-blue-200 p-6">
            <h3 className="text-lg font-bold text-blue-800 mb-4 flex items-center">
              📊 Totaux du Registre Milestones
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-200">
                <h4 className="text-sm font-medium text-gray-700">Montant Facturé</h4>
                <p className="text-lg font-bold text-blue-600">{formatCurrency(calculateMilestoneTableTotals().montantFacture)}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-200">
                <h4 className="text-sm font-medium text-gray-700">Montant TTC</h4>
                <p className="text-lg font-bold text-green-600">{formatCurrency(calculateMilestoneTableTotals().montantTTC)}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-200">
                <h4 className="text-sm font-medium text-gray-700">Total C-228</h4>
                <p className="text-lg font-bold text-blue-700">{formatCurrency(calculateMilestoneTableTotals().c228)}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-200">
                <h4 className="text-sm font-medium text-gray-700">Total C-229</h4>
                <p className="text-lg font-bold text-purple-600">{formatCurrency(calculateMilestoneTableTotals().c229)}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-200">
                <h4 className="text-sm font-medium text-gray-700">Total C-230</h4>
                <p className="text-lg font-bold text-green-700">{formatCurrency(calculateMilestoneTableTotals().c230)}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-200">
                <h4 className="text-sm font-medium text-gray-700">Total C-231</h4>
                <p className="text-lg font-bold text-orange-600">{formatCurrency(calculateMilestoneTableTotals().c231)}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'dcr' && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-orange-600 to-orange-800 text-white p-6">
            <h2 className="text-2xl font-bold flex items-center">
              📊 Registre des DCR
            </h2>
            <p className="mt-2 text-orange-100">Gestion des Demandes de Changement et Réclamations</p>
          </div>
          
          {/* Légende */}
          <div className="bg-gray-50 p-4 border-b">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Légende:</h3>
            <div className="flex flex-wrap gap-4 text-xs">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-purple-100 border border-purple-200 mr-2 rounded"></div>
                <span className="text-gray-600">Facturé (avec n° de facture)</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-white border border-gray-200 mr-2 rounded"></div>
                <span className="text-gray-600">Non facturé</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 mr-2 rounded"></div>
                <span className="text-gray-600">⚠️ Données incomplètes</span>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    # de l&apos;étape
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    No Jalon
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Facture
                  </th>
                  <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[500px]">
                    Description
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date DCR
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Taxe
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[140px]">
                    Montant
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    No. Facture
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    PSPC Enrg #
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">
                    Montant TTC
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ligne SAP
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">
                    C-228
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">
                    C-229
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">
                    C-230
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">
                    C-231
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Documents
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dcrFactures.map((dcr) => (
                  <tr key={dcr.id} className={getRowClasses(dcr)}>
                    <td className="px-2 py-2 whitespace-nowrap">
                      <input
                        type="text"
                        value={dcr.numeroEtape}
                        onChange={(e) => updateDCR(dcr.id, 'numeroEtape', e.target.value)}
                        className="w-16 text-xs border border-gray-300 rounded px-2 py-1"
                        placeholder="001"
                      />
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap">
                      <input
                        type="text"
                        value={dcr.noJalon}
                        onChange={(e) => updateDCR(dcr.id, 'noJalon', e.target.value)}
                        className="w-20 text-xs border border-gray-300 rounded px-2 py-1"
                        placeholder="J###"
                      />
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap">
                      <input
                        type="text"
                        value={dcr.dateFacture}
                        onChange={(e) => updateDCR(dcr.id, 'dateFacture', e.target.value)}
                        className="w-24 text-xs border border-gray-300 rounded px-2 py-1"
                        placeholder="YYYY-MM-DD"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        value={dcr.description}
                        onChange={(e) => updateDCR(dcr.id, 'description', e.target.value)}
                        className="w-full text-sm border border-gray-300 rounded px-3 py-1"
                        placeholder="Description détaillée du DCR..."
                      />
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap">
                      <input
                        type="text"
                        value={dcr.dateDCR}
                        onChange={(e) => updateDCR(dcr.id, 'dateDCR', e.target.value)}
                        className="w-24 text-xs border border-gray-300 rounded px-2 py-1"
                        placeholder="DD/MM/YYYY"
                      />
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap">
                      <input
                        type="number"
                        value={dcr.taxe}
                        onChange={(e) => updateDCR(dcr.id, 'taxe', parseFloat(e.target.value) || 0)}
                        className="w-16 text-xs border border-gray-300 rounded px-2 py-1"
                        min="0"
                        max="100"
                        placeholder="5"
                      />
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap">
                      <input
                        type="number"
                        value={dcr.montant}
                        onChange={(e) => updateDCR(dcr.id, 'montant', parseFloat(e.target.value) || 0)}
                        className="w-32 text-xs border border-gray-300 rounded px-2 py-1"
                        step="0.01"
                        placeholder="0.00"
                      />
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap">
                      <input
                        type="text"
                        value={dcr.noFacture}
                        onChange={(e) => updateDCR(dcr.id, 'noFacture', e.target.value)}
                        className="w-24 text-xs border border-gray-300 rounded px-2 py-1"
                        placeholder="OF-###"
                      />
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap">
                      <input
                        type="text"
                        value={dcr.pspcClaimNumber}
                        onChange={(e) => updateDCR(dcr.id, 'pspcClaimNumber', e.target.value)}
                        className="w-24 text-xs border border-gray-300 rounded px-2 py-1"
                        placeholder="PSPC-###"
                      />
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap">
                      <span className="text-sm font-medium text-green-600">
                        {formatCurrency(dcr.montantTTC)}
                      </span>
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap">
                      <input
                        type="text"
                        value={dcr.ligneSAP}
                        onChange={(e) => updateDCR(dcr.id, 'ligneSAP', e.target.value)}
                        className="w-20 text-xs border border-gray-300 rounded px-2 py-1"
                        placeholder="SAP-###"
                      />
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap">
                      <input
                        type="number"
                        value={dcr.c228}
                        onChange={(e) => updateDCR(dcr.id, 'c228', parseFloat(e.target.value) || 0)}
                        className="w-24 text-xs border border-gray-300 rounded px-2 py-1"
                        step="0.01"
                        placeholder="0.00"
                      />
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap">
                      <input
                        type="number"
                        value={dcr.c229}
                        onChange={(e) => updateDCR(dcr.id, 'c229', parseFloat(e.target.value) || 0)}
                        className="w-24 text-xs border border-gray-300 rounded px-2 py-1"
                        step="0.01"
                        placeholder="0.00"
                      />
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap">
                      <input
                        type="number"
                        value={dcr.c230}
                        onChange={(e) => updateDCR(dcr.id, 'c230', parseFloat(e.target.value) || 0)}
                        className="w-24 text-xs border border-gray-300 rounded px-2 py-1"
                        step="0.01"
                        placeholder="0.00"
                      />
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap">
                      <input
                        type="number"
                        value={dcr.c231}
                        onChange={(e) => updateDCR(dcr.id, 'c231', parseFloat(e.target.value) || 0)}
                        className="w-24 text-xs border border-gray-300 rounded px-2 py-1"
                        step="0.01"
                        placeholder="0.00"
                      />
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <button
                        onClick={() => {
                          // Naviguer vers l'onglet Documents et sélectionner le dossier
                          const event = new CustomEvent('openDocumentFolder', {
                            detail: { type: 'dcr', id: dcr.id, name: `${dcr.numeroEtape} - ${dcr.description}` }
                          });
                          window.dispatchEvent(event);
                        }}
                        className="flex items-center text-orange-600 hover:text-orange-900 text-sm bg-orange-50 hover:bg-orange-100 px-2 py-1 rounded"
                        title="Voir les documents"
                      >
                        <EyeIcon className="w-4 h-4 mr-1" />
                        <span className="text-xs">Docs</span>
                        <span className="ml-1 bg-orange-200 text-orange-800 text-xs rounded-full px-1">
                          {getDocumentsForItem('dcr', dcr.id.toString()).length}
                        </span>
                      </button>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <button
                        onClick={() => deleteDCR(dcr.id)}
                        className="text-red-600 hover:text-red-900 text-sm"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-6 bg-gray-50 border-t">
            <button
              onClick={addDCR}
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2"
            >
              ➕ Ajouter un DCR
            </button>
          </div>

          {/* Fenêtre de Totaux DCR */}
          <div className="bg-orange-50 border-t-2 border-orange-200 p-6">
            <h3 className="text-lg font-bold text-orange-800 mb-4 flex items-center">
              📊 Totaux du Registre DCR
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-orange-200">
                <h4 className="text-sm font-medium text-gray-700">Montant Facturé</h4>
                <p className="text-lg font-bold text-orange-600">{formatCurrency(calculateDCRTableTotals().montantFacture)}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-orange-200">
                <h4 className="text-sm font-medium text-gray-700">Montant TTC</h4>
                <p className="text-lg font-bold text-green-600">{formatCurrency(calculateDCRTableTotals().montantTTC)}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-orange-200">
                <h4 className="text-sm font-medium text-gray-700">Total C-228</h4>
                <p className="text-lg font-bold text-blue-700">{formatCurrency(calculateDCRTableTotals().c228)}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-orange-200">
                <h4 className="text-sm font-medium text-gray-700">Total C-229</h4>
                <p className="text-lg font-bold text-purple-600">{formatCurrency(calculateDCRTableTotals().c229)}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-orange-200">
                <h4 className="text-sm font-medium text-gray-700">Total C-230</h4>
                <p className="text-lg font-bold text-green-700">{formatCurrency(calculateDCRTableTotals().c230)}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-orange-200">
                <h4 className="text-sm font-medium text-gray-700">Total C-231</h4>
                <p className="text-lg font-bold text-orange-700">{formatCurrency(calculateDCRTableTotals().c231)}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'bilan' && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-green-800 text-white p-6">
            <h2 className="text-2xl font-bold flex items-center">
              💰 Bilan de Facturation
            </h2>
            <p className="mt-2 text-green-100">Synthèse financière des projets Ocean Factory</p>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Totaux généraux */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="text-sm font-medium text-blue-800">Total Milestones</h3>
                <p className="text-xl font-bold text-blue-900">{formatCurrency(totalMilestonesFactures)}</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h3 className="text-sm font-medium text-orange-800">Total DCR</h3>
                <p className="text-xl font-bold text-orange-900">{formatCurrency(totalDCRFactures)}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-sm font-medium text-gray-800">Total HT</h3>
                <p className="text-xl font-bold text-gray-900">{formatCurrency(totalFacturesAvantTaxes)}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="text-sm font-medium text-green-800">Total TTC</h3>
                <p className="text-xl font-bold text-green-900">{formatCurrency(totalFacturesAvecTaxes)}</p>
              </div>
            </div>

            {/* Répartition par projet */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Répartition par Projet</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="text-sm font-medium text-gray-700">C-228 NLT1</h4>
                  <p className="text-lg font-bold text-blue-600">{formatCurrency(totauxParProjet.c228)}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="text-sm font-medium text-gray-700">C-229 NLT2</h4>
                  <p className="text-lg font-bold text-purple-600">{formatCurrency(totauxParProjet.c229)}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="text-sm font-medium text-gray-700">C-230 NLT3</h4>
                  <p className="text-lg font-bold text-green-600">{formatCurrency(totauxParProjet.c230)}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="text-sm font-medium text-gray-700">C-231 NLT4</h4>
                  <p className="text-lg font-bold text-orange-600">{formatCurrency(totauxParProjet.c231)}</p>
                </div>
              </div>
            </div>

            {/* Tableau détaillé des résultats */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white p-4">
                <h3 className="text-lg font-bold">📊 Tableau de Résultats Détaillés</h3>
                <p className="text-indigo-100 text-sm mt-1">Analyse financière complète par projet</p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-xs">
                  <thead className="bg-blue-600 text-white">
                    <tr>
                      <th className="px-2 py-2 text-left font-medium">Date de lecture</th>
                      <th className="px-2 py-2 text-left font-medium min-w-[300px]">Description</th>
                      <th className="px-2 py-2 text-left font-medium">Date Facture</th>
                      <th className="px-2 py-2 text-left font-medium">Taxe</th>
                      <th className="px-2 py-2 text-left font-medium min-w-[120px]">Montant facturé</th>
                      <th className="px-2 py-2 text-left font-medium">No. Facture</th>
                      <th className="px-2 py-2 text-left font-medium">PSPC Enrg #</th>
                      <th className="px-2 py-2 text-left font-medium min-w-[120px]">Montant TTC</th>
                      <th className="px-2 py-2 text-left font-medium">Montant en extra</th>
                      <th className="px-2 py-2 text-left font-medium">Ligne SAP</th>
                      <th className="px-2 py-2 text-left font-medium min-w-[100px]">C-228</th>
                      <th className="px-2 py-2 text-left font-medium min-w-[100px]">C-229</th>
                      <th className="px-2 py-2 text-left font-medium min-w-[100px]">C-230</th>
                      <th className="px-2 py-2 text-left font-medium min-w-[100px]">C-231</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {/* Ligne TOTAL des extras */}
                    <tr className="bg-red-50 border-t-2 border-red-300">
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1 font-bold text-red-800">TOTAL des extras</td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1 font-bold text-right">10 378 749.11 $</td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1 font-bold text-right">11 230 555.91 $</td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1 font-bold text-right">6 160 688.07 $</td>
                      <td className="px-2 py-1 font-bold text-right">1 602 894.41 $</td>
                      <td className="px-2 py-1 font-bold text-right">3 377.25 $</td>
                      <td className="px-2 py-1 font-bold text-right">-</td>
                    </tr>

                    {/* Sous-total */}
                    <tr className="bg-gray-100">
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1 font-medium">Sous-total</td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1">7 771 405.18 $</td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1">TTC</td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1 font-medium text-right">8 160 781.53 $</td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1"></td>
                    </tr>

                    {/* TOTAL CONTRAT + EXTRAS */}
                    <tr className="bg-red-50 border-t-2 border-red-300">
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1 font-bold text-red-800">TOTAL CONTRAT + EXTRAS</td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1 font-bold text-right">118 378 055.30 $</td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1 font-bold text-right">89 591 948.74 $</td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1 font-bold text-right">32 161 851.82 $</td>
                      <td className="px-2 py-1 font-bold text-right">28 048 535.91 $</td>
                      <td className="px-2 py-1 font-bold text-right">12 241 493.72 $</td>
                      <td className="px-2 py-1 font-bold text-right">5 018 628.94 $</td>
                    </tr>

                    {/* TOTAL MILESTONES + EXTRAS FACTURÉS */}
                    <tr className="bg-red-50 border-t-2 border-red-300">
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1 font-bold text-red-800">TOTAL MILESTONES + EXTRAS FACTURÉS</td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1 font-bold text-right">86 532 194.36 $</td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1"></td>
                    </tr>

                    {/* TOTAL JOB COST AP */}
                    <tr className="bg-red-50 border-t-2 border-red-300">
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1 font-bold text-red-800">TOTAL JOB COST AP</td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1 font-bold text-right">92 368 901.03 $</td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1 font-bold text-right">5 597 704.36 $</td>
                      <td className="px-2 py-1 font-bold text-right">5 129 841.41 $</td>
                      <td className="px-2 py-1 font-bold text-right">5 129 841.41 $</td>
                      <td className="px-2 py-1 font-bold text-right">5 129 841.41 $</td>
                    </tr>

                    {/* ÉCART ENTRE JOB COST ET FICHIER DE FACTURATION */}
                    <tr className="bg-red-50 border-t-2 border-red-300">
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1 font-bold text-red-800">ÉCART ENTRE JOB COST ET FICHIER DE FACTURATION</td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1 font-bold text-right">26 563 347.46 $</td>
                      <td className="px-2 py-1 font-bold text-right">22 918 694.50 $</td>
                      <td className="px-2 py-1 font-bold text-right">7 111 651.31 $</td>
                      <td className="px-2 py-1 font-bold text-right">2 888 697.53 $</td>
                    </tr>

                    {/* Section Revenue projet */}
                    <tr className="bg-blue-50 border-t-4 border-blue-400">
                      <td className="px-2 py-2"></td>
                      <td className="px-2 py-2 font-bold text-blue-800">Revenue projet</td>
                      <td className="px-2 py-2"></td>
                      <td className="px-2 py-2"></td>
                      <td className="px-2 py-2"></td>
                      <td className="px-2 py-2"></td>
                      <td className="px-2 py-2"></td>
                      <td className="px-2 py-2"></td>
                      <td className="px-2 py-2"></td>
                      <td className="px-2 py-2"></td>
                      <td className="px-2 py-2"></td>
                      <td className="px-2 py-2"></td>
                      <td className="px-2 py-2"></td>
                      <td className="px-2 py-2"></td>
                    </tr>

                    {/* Amendements */}
                    <tr className="bg-gray-50">
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1">Contrat de base</td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1">Avant taxes</td>
                      <td className="px-2 py-1 text-right">68 499 306.00 $</td>
                      <td className="px-2 py-1">Avec taxes</td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1">Marge</td>
                      <td className="px-2 py-1">Plus</td>
                      <td className="px-2 py-1">Note</td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1"></td>
                    </tr>

                    {/* Liste des amendements */}
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <tr key={num} className="hover:bg-gray-50">
                        <td className="px-2 py-1"></td>
                        <td className="px-2 py-1">Amendement 00{num}</td>
                        <td className="px-2 py-1"></td>
                        <td className="px-2 py-1 text-right">
                          {num === 1 ? '68 499 306.00 $' :
                           num === 2 ? '37 380 290.66 $' :
                           num === 3 ? '30 798 906.66 $' :
                           num === 4 ? '5 638 172.15 $' :
                           num === 5 ? '100 431 862.12 $' :
                           num === 6 ? '113 426 506.22 $' :
                           num === 7 ? '104 422 506.62 $' :
                           '109 422 506.62 $'
                          }
                        </td>
                        <td className="px-2 py-1 text-right">
                          {num === 1 ? '101 776 247.00 $' :
                           num === 2 ? '4 424 566.20 $' :
                           num === 3 ? '1 316 274.87 $' :
                           num === 4 ? '4 679 336.02 $' :
                           num === 5 ? '6 893 336.05 $' :
                           num === 6 ? '6 116 897.27 $' :
                           num === 7 ? '11 464 192.73 $' :
                           ''
                          }
                        </td>
                        <td className="px-2 py-1 text-right">
                          {(num === 2 || num === 3) ? '1 729 552.28 $' : ''}
                        </td>
                        <td className="px-2 py-1">
                          {num === 2 ? 'Assurement taxes - calculé à 15% au lieu de 5% et 15%' :
                           num === 3 ? '1 split Milestones no change la valeur' :
                           num === 4 ? '0 DCR no split' :
                           num === 5 ? '79 asta TTC 5% de tax' :
                           ''
                          }
                        </td>
                        <td className="px-2 py-1"></td>
                        <td className="px-2 py-1"></td>
                        <td className="px-2 py-1"></td>
                        <td className="px-2 py-1"></td>
                        <td className="px-2 py-1"></td>
                        <td className="px-2 py-1"></td>
                      </tr>
                    ))}

                    <tr className="bg-gray-200">
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1 text-right">131 996 612.36 $</td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1"></td>
                    </tr>

                    {/* Note de calcul vérification */}
                    <tr className="bg-yellow-50 border-t-2 border-yellow-400">
                      <td className="px-2 py-2 font-bold">Note de vérification Fevrier 2024 avant du don</td>
                      <td className="px-2 py-2"></td>
                      <td className="px-2 py-2"></td>
                      <td className="px-2 py-2"></td>
                      <td className="px-2 py-2"></td>
                      <td className="px-2 py-2"></td>
                      <td className="px-2 py-2"></td>
                      <td className="px-2 py-2"></td>
                      <td className="px-2 py-2"></td>
                      <td className="px-2 py-2"></td>
                      <td className="px-2 py-2"></td>
                      <td className="px-2 py-2"></td>
                      <td className="px-2 py-2"></td>
                      <td className="px-2 py-2"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'kpi' && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-6">
            <h2 className="text-2xl font-bold flex items-center">
              📈 Indicateurs Clés de Performance
            </h2>
            <p className="mt-2 text-purple-100">Dashboard des KPI financiers Ocean Factory</p>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Métriques principales */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg">
                <h3 className="text-lg font-semibold">Taux de Facturation</h3>
                <p className="text-3xl font-bold mt-2">
                  {milestonesFactures.length > 0 ? 
                    Math.round((milestonesFactures.filter(m => m.montantFacture > 0).length / milestonesFactures.length) * 100) 
                    : 0}%
                </p>
                <p className="text-blue-100 text-sm mt-1">Milestones facturés</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg">
                <h3 className="text-lg font-semibold">Marge Moyenne</h3>
                <p className="text-3xl font-bold mt-2">
                  {totalFacturesAvantTaxes > 0 ? 
                    Math.round(((totalFacturesAvecTaxes - totalFacturesAvantTaxes) / totalFacturesAvantTaxes) * 100) 
                    : 0}%
                </p>
                <p className="text-green-100 text-sm mt-1">TTC vs HT</p>
              </div>
              
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-lg">
                <h3 className="text-lg font-semibold">Revenus DCR</h3>
                <p className="text-3xl font-bold mt-2">
                  {totalFacturesAvantTaxes > 0 ? 
                    Math.round((totalDCRFactures / totalFacturesAvantTaxes) * 100) 
                    : 0}%
                </p>
                <p className="text-orange-100 text-sm mt-1">Part des DCR</p>
              </div>
            </div>

            {/* Graphique de répartition */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Répartition des Revenus par Navire</h3>
              <div className="space-y-3">
                {Object.entries(totauxParProjet).map(([projet, montant]) => {
                  const pourcentage = totalFacturesAvantTaxes > 0 ? (montant / totalFacturesAvantTaxes) * 100 : 0
                  const couleurMap: Record<string, string> = {
                    c228: 'bg-blue-500',
                    c229: 'bg-purple-500', 
                    c230: 'bg-green-500',
                    c231: 'bg-orange-500'
                  }
                  
                  return (
                    <div key={projet} className="flex items-center">
                      <div className="w-20 text-sm font-medium text-gray-700">
                        {projet.toUpperCase()}
                      </div>
                      <div className="flex-1 mx-4">
                        <div className="bg-gray-200 rounded-full h-6">
                          <div
                            className={`h-6 rounded-full ${couleurMap[projet]} flex items-center justify-end pr-2`}
                            style={{ width: `${Math.max(pourcentage, 2)}%` }}
                          >
                            <span className="text-white text-xs font-medium">
                              {pourcentage.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="w-32 text-right text-sm font-semibold">
                        {formatCurrency(montant)}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}