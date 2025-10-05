'use client'

import { useState } from 'react'

// Interface pour les détails des milestones
interface MilestoneDetail {
  id: number
  numeroEtape: string
  description: string
  pourcentage: number
  prixUnitaireFerme: number
  prixFermeTotal: number
  facture: boolean
}

// Interface pour la facturation par projet
interface ProjectBilling {
  id: number
  c228: number
  c229: number
  c230: number
  c231: number
}

const initialMilestones: MilestoneDetail[] = [
  { id: 1, numeroEtape: '1', description: 'PDR', pourcentage: 2, prixUnitaireFerme: 1759454.42, prixFermeTotal: 1759454.42, facture: false },
  { id: 2, numeroEtape: '2', description: 'CDR', pourcentage: 4, prixUnitaireFerme: 3518908.84, prixFermeTotal: 3518908.84, facture: false },
  { id: 3, numeroEtape: '3', description: 'Financial Security', pourcentage: 0, prixUnitaireFerme: 526625.00, prixFermeTotal: 526625.00, facture: false },
  { id: 4, numeroEtape: '4a', description: 'PO one non-recurrent (steel)', pourcentage: 12, prixUnitaireFerme: 36125.13, prixFermeTotal: 144500.50, facture: false },
  { id: 5, numeroEtape: '4.1b', description: 'Balance delivery to subcontractor (steel)', pourcentage: 0, prixUnitaireFerme: 2603056.50, prixFermeTotal: 2603056.50, facture: false },
  { id: 6, numeroEtape: '4.2b', description: 'Balance delivery to subcontractor (steel)', pourcentage: 0, prixUnitaireFerme: 2603056.50, prixFermeTotal: 2603056.50, facture: false },
  { id: 7, numeroEtape: '4.3b', description: 'Balance delivery to subcontractor (steel)', pourcentage: 0, prixUnitaireFerme: 2603056.50, prixFermeTotal: 2603056.50, facture: false },
  { id: 8, numeroEtape: '4.4b', description: 'Balance delivery to subcontractor (steel)', pourcentage: 0, prixUnitaireFerme: 2603056.50, prixFermeTotal: 2603056.50, facture: false },
  { id: 9, numeroEtape: '5a', description: 'PO one non-recurrent (propulsion)', pourcentage: 8, prixUnitaireFerme: 506009.87, prixFermeTotal: 2024039.48, facture: false },
  { id: 10, numeroEtape: '5.1b', description: 'Propulsion Delivered', pourcentage: 0, prixUnitaireFerme: 1253444.55, prixFermeTotal: 1253444.55, facture: false },
  { id: 11, numeroEtape: '5.2b', description: 'Propulsion Delivered', pourcentage: 0, prixUnitaireFerme: 1253444.55, prixFermeTotal: 1253444.55, facture: false },
  { id: 12, numeroEtape: '5.3b', description: 'Propulsion Delivered', pourcentage: 0, prixUnitaireFerme: 1253444.55, prixFermeTotal: 1253444.55, facture: false },
  { id: 13, numeroEtape: '5.4b', description: 'Propulsion Delivered', pourcentage: 0, prixUnitaireFerme: 1253444.55, prixFermeTotal: 1253444.55, facture: false },
  { id: 14, numeroEtape: '6a', description: 'PO one non-recurrent (electrical)', pourcentage: 6, prixUnitaireFerme: 442084.25, prixFermeTotal: 1768337.00, facture: false },
  { id: 15, numeroEtape: '6.1b', description: 'Electrical Delivered', pourcentage: 0, prixUnitaireFerme: 877506.57, prixFermeTotal: 877506.57, facture: false },
  { id: 16, numeroEtape: '6.2b', description: 'Electrical Delivered', pourcentage: 0, prixUnitaireFerme: 877506.57, prixFermeTotal: 877506.57, facture: false },
  { id: 17, numeroEtape: '6.3b', description: 'Electrical Delivered', pourcentage: 0, prixUnitaireFerme: 877506.57, prixFermeTotal: 877506.57, facture: false },
  { id: 18, numeroEtape: '6.4b', description: 'Electrical Delivered', pourcentage: 0, prixUnitaireFerme: 877506.57, prixFermeTotal: 877506.57, facture: false },
  { id: 19, numeroEtape: '7.1', description: 'Hull, deck, wheelhouse enclosed C228 NLT1', pourcentage: 10, prixUnitaireFerme: 2199318.03, prixFermeTotal: 2199318.03, facture: false },
  { id: 20, numeroEtape: '7.2', description: 'Hull, deck, wheelhouse enclosed C229 NLT2', pourcentage: 0, prixUnitaireFerme: 2199318.03, prixFermeTotal: 2199318.03, facture: false },
  { id: 21, numeroEtape: '7.3', description: 'Hull, deck, wheelhouse enclosed C230 NLT3', pourcentage: 10, prixUnitaireFerme: 8797272.12, prixFermeTotal: 8797272.12, facture: false },
  { id: 22, numeroEtape: '7.4', description: 'Hull, deck, wheelhouse enclosed C231 NLT4', pourcentage: 0, prixUnitaireFerme: 8797272.12, prixFermeTotal: 8797272.12, facture: false },
  { id: 23, numeroEtape: '7.3a', description: 'Deckhouse complete and accepted by Canada', pourcentage: 0, prixUnitaireFerme: 329897.71, prixFermeTotal: 329897.71, facture: false },
  { id: 24, numeroEtape: '7.3b', description: 'Hull enclosed and accepted by Canada', pourcentage: 0, prixUnitaireFerme: 989693.11, prixFermeTotal: 989693.11, facture: false },
  { id: 25, numeroEtape: '7.3c', description: 'Deckhouse and hull assembly complete and accepted by Canada', pourcentage: 0, prixUnitaireFerme: 879727.21, prixFermeTotal: 879727.21, facture: false },
  { id: 26, numeroEtape: '7.4a', description: 'Deckhouse complete and accepted by Canada', pourcentage: 0, prixUnitaireFerme: 329897.71, prixFermeTotal: 329897.71, facture: false },
  { id: 27, numeroEtape: '7.4b', description: 'Hull enclosed and accepted by Canada', pourcentage: 0, prixUnitaireFerme: 989693.11, prixFermeTotal: 989693.11, facture: false },
  { id: 28, numeroEtape: '7.4c', description: 'Deckhouse and hull assembly complete and accepted by Canada', pourcentage: 0, prixUnitaireFerme: 879727.21, prixFermeTotal: 879727.21, facture: false },
  { id: 29, numeroEtape: '8.1', description: 'Prime movers installed and accepted by Canada', pourcentage: 10, prixUnitaireFerme: 8797272.10, prixFermeTotal: 8797272.10, facture: false },
  { id: 30, numeroEtape: '8.1a', description: 'Prime Movers Installed', pourcentage: 0, prixUnitaireFerme: 3518908.84, prixFermeTotal: 3518908.84, facture: false },
  { id: 31, numeroEtape: '8.2a', description: 'Prime Movers Installed', pourcentage: 0, prixUnitaireFerme: 3518908.84, prixFermeTotal: 3518908.84, facture: false },
  { id: 32, numeroEtape: '8.3a', description: 'Prime Movers Installed', pourcentage: 0, prixUnitaireFerme: 3518908.84, prixFermeTotal: 3518908.84, facture: false },
  { id: 33, numeroEtape: '8.4a', description: 'Prime Movers Installed', pourcentage: 0, prixUnitaireFerme: 3518908.84, prixFermeTotal: 3518908.84, facture: false },
  { id: 34, numeroEtape: '8.1b', description: 'Prime mover to Propulsor C228 NLT1', pourcentage: 10, prixUnitaireFerme: 1319590.81, prixFermeTotal: 1319590.81, facture: false },
  { id: 35, numeroEtape: '8.2b1', description: 'All shaft components installed and accepted by Canada', pourcentage: 0, prixUnitaireFerme: 527836.33, prixFermeTotal: 527836.33, facture: false },
  { id: 36, numeroEtape: '8.3b1', description: 'All shaft components installed and accepted by Canada', pourcentage: 0, prixUnitaireFerme: 527836.33, prixFermeTotal: 527836.33, facture: false },
  { id: 37, numeroEtape: '8.4b1', description: 'All shaft components installed and accepted by Canada', pourcentage: 0, prixUnitaireFerme: 527836.33, prixFermeTotal: 527836.33, facture: false },
  { id: 38, numeroEtape: '8.2b2', description: 'Final alignment complete and accepted by Canada', pourcentage: 0, prixUnitaireFerme: 791754.49, prixFermeTotal: 791754.49, facture: false },
  { id: 39, numeroEtape: '8.3b2', description: 'Final alignment complete and accepted by Canada', pourcentage: 0, prixUnitaireFerme: 791754.49, prixFermeTotal: 791754.49, facture: false },
  { id: 40, numeroEtape: '8.4b2', description: 'Final alignment complete and accepted by Canada', pourcentage: 0, prixUnitaireFerme: 791754.49, prixFermeTotal: 791754.49, facture: false },
  { id: 41, numeroEtape: '9.1', description: 'Mise à la mer du navire, tests et essais terminés et acceptés par le Canada', pourcentage: 15, prixUnitaireFerme: 13195908.15, prixFermeTotal: 13195908.15, facture: false },
  { id: 42, numeroEtape: '9.2', description: 'Mise à la mer du navire, tests et essais terminés et acceptés par le Canada', pourcentage: 0, prixUnitaireFerme: 13195908.15, prixFermeTotal: 13195908.15, facture: false },
  { id: 43, numeroEtape: '9.3', description: 'Mise à la mer du navire, tests et essais terminés et acceptés par le Canada', pourcentage: 0, prixUnitaireFerme: 13195908.15, prixFermeTotal: 13195908.15, facture: false },
  { id: 44, numeroEtape: '9.4', description: 'Mise à la mer du navire, tests et essais terminés et acceptés par le Canada', pourcentage: 0, prixUnitaireFerme: 13195908.15, prixFermeTotal: 13195908.15, facture: false },
  { id: 45, numeroEtape: '9.1a', description: 'Test and Trials Program Complete and accepted by Canada (applicable for 4)', pourcentage: 0, prixUnitaireFerme: 659795.40, prixFermeTotal: 659795.40, facture: false },
  { id: 46, numeroEtape: '9.2a', description: 'Test and Trials Program Complete and accepted by Canada (applicable for 4)', pourcentage: 0, prixUnitaireFerme: 659795.40, prixFermeTotal: 659795.40, facture: false },
  { id: 47, numeroEtape: '9.3a', description: 'Test and Trials Program Complete and accepted by Canada (applicable for 4)', pourcentage: 0, prixUnitaireFerme: 659795.40, prixFermeTotal: 659795.40, facture: false },
  { id: 48, numeroEtape: '9.4a', description: 'Test and Trials Program Complete and accepted by Canada (applicable for 4)', pourcentage: 0, prixUnitaireFerme: 659795.40, prixFermeTotal: 659795.40, facture: false },
  { id: 49, numeroEtape: '9.1b', description: 'Pre-Requisites Complete and accepted by Canada (Commissioning, Flushing, ITP)', pourcentage: 0, prixUnitaireFerme: 1319590.80, prixFermeTotal: 1319590.80, facture: false },
  { id: 50, numeroEtape: '9.2b', description: 'Pre-Requisites Complete and accepted by Canada (Commissioning, Flushing, ITP)', pourcentage: 0, prixUnitaireFerme: 1319590.80, prixFermeTotal: 1319590.80, facture: false },
  { id: 51, numeroEtape: '9.3b', description: 'Pre-Requisites Complete and accepted by Canada (Commissioning, Flushing, ITP)', pourcentage: 0, prixUnitaireFerme: 1319590.80, prixFermeTotal: 1319590.80, facture: false },
  { id: 52, numeroEtape: '9.4b', description: 'Pre-Requisites Complete and accepted by Canada (Commissioning, Flushing, ITP)', pourcentage: 0, prixUnitaireFerme: 1319590.80, prixFermeTotal: 1319590.80, facture: false },
  { id: 53, numeroEtape: '9.1c', description: 'Trials Conduct Complete and accepted by Canada', pourcentage: 0, prixUnitaireFerme: 5938158.68, prixFermeTotal: 5938158.68, facture: false },
  { id: 54, numeroEtape: '9.2c', description: 'Trials Conduct Complete and accepted by Canada', pourcentage: 0, prixUnitaireFerme: 5938158.68, prixFermeTotal: 5938158.68, facture: false },
  { id: 55, numeroEtape: '9.3c', description: 'Trials Conduct Complete and accepted by Canada', pourcentage: 0, prixUnitaireFerme: 5938158.68, prixFermeTotal: 5938158.68, facture: false },
  { id: 56, numeroEtape: '9.4c', description: 'Trials Conduct Complete and accepted by Canada', pourcentage: 0, prixUnitaireFerme: 5938158.68, prixFermeTotal: 5938158.68, facture: false },
  { id: 57, numeroEtape: '9.1d', description: 'Trials Reports Submitted and accepted by Canada', pourcentage: 0, prixUnitaireFerme: 2639181.64, prixFermeTotal: 2639181.64, facture: false },
  { id: 58, numeroEtape: '9.2d', description: 'Trials Reports Submitted and accepted by Canada', pourcentage: 0, prixUnitaireFerme: 2639181.64, prixFermeTotal: 2639181.64, facture: false },
  { id: 59, numeroEtape: '9.3d', description: 'Trials Reports Submitted and accepted by Canada', pourcentage: 0, prixUnitaireFerme: 2639181.64, prixFermeTotal: 2639181.64, facture: false },
  { id: 60, numeroEtape: '9.4d', description: 'Trials Reports Submitted and accepted by Canada', pourcentage: 0, prixUnitaireFerme: 2639181.64, prixFermeTotal: 2639181.64, facture: false },
  { id: 61, numeroEtape: '10.1', description: 'First Article Completion at Subcontractor Facility', pourcentage: 10, prixUnitaireFerme: 8797272.10, prixFermeTotal: 8797272.10, facture: false },
  { id: 62, numeroEtape: '10.2', description: 'First Article Completion at Subcontractor Facility', pourcentage: 0, prixUnitaireFerme: 8797272.10, prixFermeTotal: 8797272.10, facture: false },
  { id: 63, numeroEtape: '10.3', description: 'First Article Completion at Subcontractor Facility', pourcentage: 10, prixUnitaireFerme: 8797272.10, prixFermeTotal: 8797272.10, facture: false },
  { id: 64, numeroEtape: '10.4', description: 'First Article Completion at Subcontractor Facility', pourcentage: 0, prixUnitaireFerme: 8797272.10, prixFermeTotal: 8797272.10, facture: false },
  { id: 65, numeroEtape: '11.1', description: 'C228 NLT1 Ready for Delivery', pourcentage: 15, prixUnitaireFerme: 13195908.15, prixFermeTotal: 13195908.15, facture: false },
  { id: 66, numeroEtape: '11.2', description: 'C229 NLT2 Ready for Delivery', pourcentage: 0, prixUnitaireFerme: 13195908.15, prixFermeTotal: 13195908.15, facture: false },
  { id: 67, numeroEtape: '11.3', description: 'C230 NLT3 Ready for Delivery', pourcentage: 15, prixUnitaireFerme: 52783635.60, prixFermeTotal: 52783635.60, facture: false },
  { id: 68, numeroEtape: '11.4', description: 'C231 NLT4 Ready for Delivery', pourcentage: 0, prixUnitaireFerme: 52783635.60, prixFermeTotal: 52783635.60, facture: false },
  { id: 69, numeroEtape: '12.1', description: 'C228 NLT1 Delivered and Accepted by the Canada', pourcentage: 8, prixUnitaireFerme: 7037826.52, prixFermeTotal: 7037826.52, facture: false },
  { id: 70, numeroEtape: '12.2', description: 'C229 NLT2 Delivered and Accepted by the Canada', pourcentage: 0, prixUnitaireFerme: 7037826.52, prixFermeTotal: 7037826.52, facture: false },
  { id: 71, numeroEtape: '12.3', description: 'C230 NLT3 Delivered and Accepted by the Canada', pourcentage: 8, prixUnitaireFerme: 28151307.08, prixFermeTotal: 28151307.08, facture: false },
  { id: 72, numeroEtape: '12.4', description: 'C231 NLT4 Delivered and Accepted by the Canada', pourcentage: 0, prixUnitaireFerme: 28151307.08, prixFermeTotal: 28151307.08, facture: false },
  { id: 73, numeroEtape: '13.1', description: 'Technology Transfer', pourcentage: 0, prixUnitaireFerme: 200000.00, prixFermeTotal: 200000.00, facture: false },
  { id: 74, numeroEtape: '13.2', description: 'Technology Transfer', pourcentage: 0, prixUnitaireFerme: 200000.00, prixFermeTotal: 200000.00, facture: false },
  { id: 75, numeroEtape: '13.3', description: 'Technology Transfer', pourcentage: 0, prixUnitaireFerme: 800000.00, prixFermeTotal: 800000.00, facture: false },
  { id: 76, numeroEtape: '13.4', description: 'Technology Transfer', pourcentage: 0, prixUnitaireFerme: 800000.00, prixFermeTotal: 800000.00, facture: false },
  { id: 77, numeroEtape: '14.1', description: 'Final Technical Data Package (All 4 vessels)', pourcentage: 0, prixUnitaireFerme: 300000.00, prixFermeTotal: 300000.00, facture: false },
  { id: 78, numeroEtape: '14.2', description: 'Final Technical Data Package (All 4 vessels)', pourcentage: 0, prixUnitaireFerme: 300000.00, prixFermeTotal: 300000.00, facture: false },
  { id: 79, numeroEtape: '14.3', description: 'Final Technical Data Package (All 4 vessels)', pourcentage: 0, prixUnitaireFerme: 1200000.00, prixFermeTotal: 1200000.00, facture: false },
  { id: 80, numeroEtape: '14.4', description: 'Final Technical Data Package (All 4 vessels)', pourcentage: 0, prixUnitaireFerme: 1200000.00, prixFermeTotal: 1200000.00, facture: false },
  { id: 81, numeroEtape: '15.1', description: 'Shore-based Training', pourcentage: 0, prixUnitaireFerme: 100000.00, prixFermeTotal: 100000.00, facture: false },
  { id: 82, numeroEtape: '15.2', description: 'Shore-based Training', pourcentage: 0, prixUnitaireFerme: 100000.00, prixFermeTotal: 100000.00, facture: false },
  { id: 83, numeroEtape: '15.3', description: 'Shore-based Training', pourcentage: 0, prixUnitaireFerme: 400000.00, prixFermeTotal: 400000.00, facture: false },
  { id: 84, numeroEtape: '15.4', description: 'Shore-based Training', pourcentage: 0, prixUnitaireFerme: 400000.00, prixFermeTotal: 400000.00, facture: false },
  { id: 85, numeroEtape: '16.1', description: 'Instruction and Maintenance Training', pourcentage: 0, prixUnitaireFerme: 150000.00, prixFermeTotal: 150000.00, facture: false },
  { id: 86, numeroEtape: '16.2', description: 'Instruction and Maintenance Training', pourcentage: 0, prixUnitaireFerme: 150000.00, prixFermeTotal: 150000.00, facture: false },
  { id: 87, numeroEtape: '16.3', description: 'Instruction and Maintenance Training', pourcentage: 0, prixUnitaireFerme: 600000.00, prixFermeTotal: 600000.00, facture: false },
  { id: 88, numeroEtape: '16.4', description: 'Instruction and Maintenance Training', pourcentage: 0, prixUnitaireFerme: 600000.00, prixFermeTotal: 600000.00, facture: false },
  { id: 89, numeroEtape: '17.1', description: 'Training - On Board', pourcentage: 0, prixUnitaireFerme: 100000.00, prixFermeTotal: 100000.00, facture: false },
  { id: 90, numeroEtape: '17.2', description: 'Training - On Board', pourcentage: 0, prixUnitaireFerme: 100000.00, prixFermeTotal: 100000.00, facture: false },
  { id: 91, numeroEtape: '17.3', description: 'Training - On Board', pourcentage: 0, prixUnitaireFerme: 400000.00, prixFermeTotal: 400000.00, facture: false },
  { id: 92, numeroEtape: '17.4', description: 'Training - On Board', pourcentage: 0, prixUnitaireFerme: 400000.00, prixFermeTotal: 400000.00, facture: false },
  { id: 93, numeroEtape: '18.1', description: 'Mandatory - ISI', pourcentage: 0, prixUnitaireFerme: 250000.00, prixFermeTotal: 250000.00, facture: false },
  { id: 94, numeroEtape: '18.2', description: 'Mandatory - ISI', pourcentage: 0, prixUnitaireFerme: 250000.00, prixFermeTotal: 250000.00, facture: false },
  { id: 95, numeroEtape: '18.3', description: 'Mandatory - ISI', pourcentage: 0, prixUnitaireFerme: 1000000.00, prixFermeTotal: 1000000.00, facture: false },
  { id: 96, numeroEtape: '18.4', description: 'Mandatory - ISI', pourcentage: 0, prixUnitaireFerme: 1000000.00, prixFermeTotal: 1000000.00, facture: false },
  { id: 97, numeroEtape: '19.1', description: 'Warranty', pourcentage: 0, prixUnitaireFerme: 500000.00, prixFermeTotal: 500000.00, facture: false },
  { id: 98, numeroEtape: '19.2', description: 'Warranty', pourcentage: 0, prixUnitaireFerme: 500000.00, prixFermeTotal: 500000.00, facture: false },
  { id: 99, numeroEtape: '19.3', description: 'Warranty', pourcentage: 0, prixUnitaireFerme: 2000000.00, prixFermeTotal: 2000000.00, facture: false },
  { id: 100, numeroEtape: '19.4', description: 'Warranty', pourcentage: 0, prixUnitaireFerme: 2000000.00, prixFermeTotal: 2000000.00, facture: false },
  // Milestones additionnels de 101 à 136
  { id: 101, numeroEtape: '19.a', description: 'Auxiliary Milestone - Delivery and Acceptance NLT 1', pourcentage: 0, prixUnitaireFerme: 400000.00, prixFermeTotal: 400000.00, facture: false },
  { id: 102, numeroEtape: '19.b', description: 'Auxiliary Milestone - Delivery and Acceptance NLT 2', pourcentage: 0, prixUnitaireFerme: 400000.00, prixFermeTotal: 400000.00, facture: false },
  { id: 103, numeroEtape: '19.c', description: 'Auxiliary Milestone - Delivery and Acceptance NLT 3', pourcentage: 0, prixUnitaireFerme: 1600000.00, prixFermeTotal: 1600000.00, facture: false },
  { id: 104, numeroEtape: '19.d', description: 'Auxiliary Milestone - Delivery and Acceptance NLT 4', pourcentage: 0, prixUnitaireFerme: 1600000.00, prixFermeTotal: 1600000.00, facture: false },
  { id: 105, numeroEtape: '19.e', description: 'Auxiliary Milestone - Delivery and Acceptance NLT 1', pourcentage: 0, prixUnitaireFerme: 400000.00, prixFermeTotal: 400000.00, facture: false },
  { id: 106, numeroEtape: '19.f', description: 'Auxiliary Milestone - Delivery and Acceptance NLT 2', pourcentage: 0, prixUnitaireFerme: 400000.00, prixFermeTotal: 400000.00, facture: false },
  { id: 107, numeroEtape: '19.g', description: 'Auxiliary Milestone - Delivery and Acceptance NLT 3', pourcentage: 0, prixUnitaireFerme: 1600000.00, prixFermeTotal: 1600000.00, facture: false },
  { id: 108, numeroEtape: '19.h', description: 'Auxiliary Milestone - Delivery and Acceptance NLT 4', pourcentage: 0, prixUnitaireFerme: 1600000.00, prixFermeTotal: 1600000.00, facture: false },
  { id: 109, numeroEtape: '20.1', description: 'Construction Planning and Additional Services', pourcentage: 0, prixUnitaireFerme: 300000.00, prixFermeTotal: 300000.00, facture: false },
  { id: 110, numeroEtape: '20.2', description: 'Construction Planning and Additional Services', pourcentage: 0, prixUnitaireFerme: 300000.00, prixFermeTotal: 300000.00, facture: false },
  { id: 111, numeroEtape: '20.3', description: 'Construction Planning and Additional Services', pourcentage: 0, prixUnitaireFerme: 1200000.00, prixFermeTotal: 1200000.00, facture: false },
  { id: 112, numeroEtape: '20.4', description: 'Construction Planning and Additional Services', pourcentage: 0, prixUnitaireFerme: 1200000.00, prixFermeTotal: 1200000.00, facture: false },
  { id: 113, numeroEtape: '21.1', description: 'Project Management and Quality Assurance', pourcentage: 0, prixUnitaireFerme: 500000.00, prixFermeTotal: 500000.00, facture: false },
  { id: 114, numeroEtape: '21.2', description: 'Project Management and Quality Assurance', pourcentage: 0, prixUnitaireFerme: 500000.00, prixFermeTotal: 500000.00, facture: false },
  { id: 115, numeroEtape: '21.3', description: 'Project Management and Quality Assurance', pourcentage: 0, prixUnitaireFerme: 2000000.00, prixFermeTotal: 2000000.00, facture: false },
  { id: 116, numeroEtape: '21.4', description: 'Project Management and Quality Assurance', pourcentage: 0, prixUnitaireFerme: 2000000.00, prixFermeTotal: 2000000.00, facture: false },
  { id: 117, numeroEtape: '22.1', description: 'Systems Integration and Testing', pourcentage: 0, prixUnitaireFerme: 600000.00, prixFermeTotal: 600000.00, facture: false },
  { id: 118, numeroEtape: '22.2', description: 'Systems Integration and Testing', pourcentage: 0, prixUnitaireFerme: 600000.00, prixFermeTotal: 600000.00, facture: false },
  { id: 119, numeroEtape: '22.3', description: 'Systems Integration and Testing', pourcentage: 0, prixUnitaireFerme: 2400000.00, prixFermeTotal: 2400000.00, facture: false },
  { id: 120, numeroEtape: '22.4', description: 'Systems Integration and Testing', pourcentage: 0, prixUnitaireFerme: 2400000.00, prixFermeTotal: 2400000.00, facture: false },
  { id: 121, numeroEtape: '23.1', description: 'Final Documentation and Deliverables', pourcentage: 0, prixUnitaireFerme: 200000.00, prixFermeTotal: 200000.00, facture: false },
  { id: 122, numeroEtape: '23.2', description: 'Final Documentation and Deliverables', pourcentage: 0, prixUnitaireFerme: 200000.00, prixFermeTotal: 200000.00, facture: false },
  { id: 123, numeroEtape: '23.3', description: 'Final Documentation and Deliverables', pourcentage: 0, prixUnitaireFerme: 800000.00, prixFermeTotal: 800000.00, facture: false },
  { id: 124, numeroEtape: '23.4', description: 'Final Documentation and Deliverables', pourcentage: 0, prixUnitaireFerme: 800000.00, prixFermeTotal: 800000.00, facture: false },
  { id: 125, numeroEtape: '24.1', description: 'Supply Chain Management', pourcentage: 0, prixUnitaireFerme: 350000.00, prixFermeTotal: 350000.00, facture: false },
  { id: 126, numeroEtape: '24.2', description: 'Supply Chain Management', pourcentage: 0, prixUnitaireFerme: 350000.00, prixFermeTotal: 350000.00, facture: false },
  { id: 127, numeroEtape: '24.3', description: 'Supply Chain Management', pourcentage: 0, prixUnitaireFerme: 1400000.00, prixFermeTotal: 1400000.00, facture: false },
  { id: 128, numeroEtape: '24.4', description: 'Supply Chain Management', pourcentage: 0, prixUnitaireFerme: 1400000.00, prixFermeTotal: 1400000.00, facture: false },
  { id: 129, numeroEtape: '25.1', description: 'Risk Management and Mitigation', pourcentage: 0, prixUnitaireFerme: 250000.00, prixFermeTotal: 250000.00, facture: false },
  { id: 130, numeroEtape: '25.2', description: 'Risk Management and Mitigation', pourcentage: 0, prixUnitaireFerme: 250000.00, prixFermeTotal: 250000.00, facture: false },
  { id: 131, numeroEtape: '25.3', description: 'Risk Management and Mitigation', pourcentage: 0, prixUnitaireFerme: 1000000.00, prixFermeTotal: 1000000.00, facture: false },
  { id: 132, numeroEtape: '25.4', description: 'Risk Management and Mitigation', pourcentage: 0, prixUnitaireFerme: 1000000.00, prixFermeTotal: 1000000.00, facture: false },
  { id: 133, numeroEtape: '26.1', description: 'Environmental Compliance', pourcentage: 0, prixUnitaireFerme: 150000.00, prixFermeTotal: 150000.00, facture: false },
  { id: 134, numeroEtape: '26.2', description: 'Environmental Compliance', pourcentage: 0, prixUnitaireFerme: 150000.00, prixFermeTotal: 150000.00, facture: false },
  { id: 135, numeroEtape: '26.3', description: 'Environmental Compliance', pourcentage: 0, prixUnitaireFerme: 600000.00, prixFermeTotal: 600000.00, facture: false },
  { id: 136, numeroEtape: '26.4', description: 'Environmental Compliance', pourcentage: 0, prixUnitaireFerme: 600000.00, prixFermeTotal: 600000.00, facture: false }
]

// Fonction pour calculer la facturation avant taxes automatiquement
const calculateBillingBeforeTax = (milestones: MilestoneDetail[]): ProjectBilling[] => {
  return milestones.map(milestone => {
    const quarterAmount = milestone.prixFermeTotal / 4
    return {
      id: milestone.id,
      c228: quarterAmount,
      c229: quarterAmount,
      c230: quarterAmount,
      c231: quarterAmount
    }
  })
}

// Fonction pour calculer la facturation après taxes (TPS 5% + TVQ 9.975% = 14.975%)
const calculateBillingAfterTax = (milestones: MilestoneDetail[]): ProjectBilling[] => {
  const TPS_RATE = 0.05 // 5%
  const TVQ_RATE = 0.09975 // 9.975%
  const TOTAL_TAX_RATE = TPS_RATE + TVQ_RATE // 14.975%

  return milestones.map(milestone => {
    const beforeTaxAmount = milestone.prixFermeTotal
    const totalWithTax = beforeTaxAmount * (1 + TOTAL_TAX_RATE)
    const quarterAmount = totalWithTax / 4
    
    return {
      id: milestone.id,
      c228: quarterAmount,
      c229: quarterAmount,
      c230: quarterAmount,
      c231: quarterAmount
    }
  })
}

// Données initiales pour la facturation
const initialBillingBeforeTax: ProjectBilling[] = calculateBillingBeforeTax(initialMilestones)

const initialBillingWithTax: ProjectBilling[] = calculateBillingAfterTax(initialMilestones)

export default function MilestonesDetails() {
  const [milestones, setMilestones] = useState<MilestoneDetail[]>(initialMilestones)
  const [billingBeforeTax, setBillingBeforeTax] = useState<ProjectBilling[]>(initialBillingBeforeTax)
  const [billingWithTax, setBillingWithTax] = useState<ProjectBilling[]>(initialBillingWithTax)
  const [activeView, setActiveView] = useState<'details' | 'billing-before' | 'billing-with'>('details')

  const updateMilestone = (id: number, field: keyof MilestoneDetail, value: string | number | boolean) => {
    setMilestones(prev => {
      const updatedMilestones = prev.map(milestone => 
        milestone.id === id ? { ...milestone, [field]: value } : milestone
      )
      
      // Si le prix ferme total change, mettre à jour automatiquement les facturations
      if (field === 'prixFermeTotal') {
        setBillingBeforeTax(calculateBillingBeforeTax(updatedMilestones))
        setBillingWithTax(calculateBillingAfterTax(updatedMilestones))
      }
      
      return updatedMilestones
    })
  }

  const updateBilling = (
    type: 'before' | 'with',
    id: number,
    field: keyof ProjectBilling,
    value: number
  ) => {
    const setter = type === 'before' ? setBillingBeforeTax : setBillingWithTax
    setter(prev => prev.map(billing => 
      billing.id === id ? { ...billing, [field]: value } : billing
    ))
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-CA', {
      style: 'currency',
      currency: 'CAD'
    }).format(amount)
  }

  // Calculs des totaux
  const totalMilestones = milestones.reduce((sum, m) => sum + m.prixFermeTotal, 0)
  const totalPercentage = milestones.reduce((sum, m) => sum + m.pourcentage, 0)
  const totalFactures = milestones.filter(m => m.facture).reduce((sum, m) => sum + m.prixFermeTotal, 0)
  const totalEnAttente = totalMilestones - totalFactures

  const currentBilling = activeView === 'billing-before' ? billingBeforeTax : billingWithTax
  const updateCurrentBilling = (id: number, field: keyof ProjectBilling, value: number) => {
    updateBilling(activeView === 'billing-before' ? 'before' : 'with', id, field, value)
  }

  return (
    <div className="space-y-6">
      {/* En-tête avec navigation */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-4">📋 Détails des Milestones - Projet Ocean Factory</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveView('details')}
            className={`px-4 py-2 rounded transition-colors ${
              activeView === 'details' 
                ? 'bg-white text-blue-600' 
                : 'bg-blue-500 hover:bg-blue-400'
            }`}
          >
            📊 Vue Détaillée
          </button>
          <button
            onClick={() => setActiveView('billing-before')}
            className={`px-4 py-2 rounded transition-colors ${
              activeView === 'billing-before' 
                ? 'bg-white text-blue-600' 
                : 'bg-blue-500 hover:bg-blue-400'
            }`}
          >
            💰 Facturation HT
          </button>
          <button
            onClick={() => setActiveView('billing-with')}
            className={`px-4 py-2 rounded transition-colors ${
              activeView === 'billing-with' 
                ? 'bg-white text-blue-600' 
                : 'bg-blue-500 hover:bg-blue-400'
            }`}
          >
            🧾 Facturation TTC
          </button>
        </div>
      </div>

      {/* Vue détaillée des milestones */}
      {activeView === 'details' && (
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
          {/* Tableau principal - 3/4 de la largeur */}
          <div className="xl:col-span-3">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-blue-50">
                    <tr>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Étape</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">%</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix Unitaire</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix Total</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Facturé</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {milestones.map((milestone) => (
                      <tr key={milestone.id} className={milestone.facture ? "bg-purple-50" : ""}>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                          {milestone.id}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <input
                            type="text"
                            value={milestone.numeroEtape}
                            onChange={(e) => updateMilestone(milestone.id, 'numeroEtape', e.target.value)}
                            className="w-20 text-sm border border-gray-300 rounded px-2 py-1"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={milestone.description}
                            onChange={(e) => updateMilestone(milestone.id, 'description', e.target.value)}
                            className="w-full text-sm border border-gray-300 rounded px-2 py-1"
                            style={{ minWidth: '300px' }}
                          />
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <input
                            type="number"
                            value={milestone.pourcentage}
                            onChange={(e) => updateMilestone(milestone.id, 'pourcentage', parseFloat(e.target.value) || 0)}
                            className="w-16 text-sm border border-gray-300 rounded px-2 py-1"
                            min="0"
                            max="100"
                          />
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <input
                            type="number"
                            value={milestone.prixUnitaireFerme}
                            onChange={(e) => updateMilestone(milestone.id, 'prixUnitaireFerme', parseFloat(e.target.value) || 0)}
                            className="w-28 text-sm border border-gray-300 rounded px-2 py-1"
                            step="0.01"
                          />
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <input
                            type="number"
                            value={milestone.prixFermeTotal}
                            onChange={(e) => updateMilestone(milestone.id, 'prixFermeTotal', parseFloat(e.target.value) || 0)}
                            className="w-28 text-sm border border-gray-300 rounded px-2 py-1"
                            step="0.01"
                          />
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-center">
                          <input
                            type="checkbox"
                            checked={milestone.facture}
                            onChange={(e) => updateMilestone(milestone.id, 'facture', e.target.checked)}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-blue-100">
                    <tr className="font-bold">
                      <td colSpan={4} className="px-3 py-3 text-sm text-blue-900">TOTAL</td>
                      <td className="px-3 py-3 text-sm text-blue-900">{formatCurrency(totalMilestones)}</td>
                      <td className="px-3 py-3 text-sm text-blue-900">{formatCurrency(totalMilestones)}</td>
                      <td className="px-3 py-3 text-sm text-blue-900">{milestones.filter(m => m.facture).length}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>

          {/* Résumé - 1/4 de la largeur */}
          <div className="space-y-4">
            {/* Carte de résumé financier */}
            <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">💰 Résumé Financier</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-green-100">Total Milestones</p>
                  <p className="text-xl font-bold">{formatCurrency(totalMilestones)}</p>
                </div>
                <div>
                  <p className="text-green-100">Facturé</p>
                  <p className="text-xl font-bold">{formatCurrency(totalFactures)}</p>
                </div>
                <div>
                  <p className="text-green-100">En Attente</p>
                  <p className="text-xl font-bold">{formatCurrency(totalEnAttente)}</p>
                </div>
              </div>
            </div>

            {/* Carte de statistiques */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">📊 Statistiques</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-blue-100">Total Milestones</p>
                  <p className="text-xl font-bold">{milestones.length}</p>
                </div>
                <div>
                  <p className="text-blue-100">Facturés</p>
                  <p className="text-xl font-bold">{milestones.filter(m => m.facture).length}</p>
                </div>
                <div>
                  <p className="text-blue-100">% Total</p>
                  <p className="text-xl font-bold">{totalPercentage.toFixed(1)}%</p>
                </div>
              </div>
            </div>

            {/* Carte de progression */}
            <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">🎯 Progression</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-purple-100">Taux de Facturation</p>
                  <p className="text-xl font-bold">
                    {totalMilestones > 0 ? ((totalFactures / totalMilestones) * 100).toFixed(1) : 0}%
                  </p>
                </div>
                <div className="w-full bg-purple-300 rounded-full h-2">
                  <div 
                    className="bg-white h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${totalMilestones > 0 ? (totalFactures / totalMilestones) * 100 : 0}%` 
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Vue facturation */}
      {(activeView === 'billing-before' || activeView === 'billing-with') && (
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
          {/* Tableau facturation - 3/4 de la largeur */}
          <div className="xl:col-span-3">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-orange-600 to-orange-800 text-white p-4">
                <h2 className="text-xl font-bold">
                  {activeView === 'billing-before' ? '💰 Facturation Hors Taxes' : '🧾 Facturation TTC'}
                </h2>
                {activeView === 'billing-before' && (
                  <p className="text-orange-100 text-sm mt-1">
                    ⚡ Calcul automatique : Prix ferme total ÷ 4 projets pour chaque navire
                  </p>
                )}
                {activeView === 'billing-with' && (
                  <p className="text-orange-100 text-sm mt-1">
                    ⚡ Calcul automatique : Prix HT + TPS (5%) + TVQ (9.975%) = Total TTC ÷ 4 projets
                  </p>
                )}
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-orange-50">
                    <tr>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">C228</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">C229</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">C230</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">C231</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentBilling.map((billing, index) => (
                      <tr key={billing.id}>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                          {billing.id}
                        </td>
                        <td className="px-3 py-2 text-sm text-gray-900">
                          {milestones[index]?.description || 'N/A'}
                        </td>
                        {activeView === 'billing-before' ? (
                          // Mode lecture seule pour facturation avant taxes (calcul automatique)
                          <>
                            <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-green-600">
                              {formatCurrency(billing.c228)}
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-green-600">
                              {formatCurrency(billing.c229)}
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-green-600">
                              {formatCurrency(billing.c230)}
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-green-600">
                              {formatCurrency(billing.c231)}
                            </td>
                          </>
                        ) : (
                          // Mode lecture seule pour facturation TTC (calcul automatique avec taxes)
                          <>
                            <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-purple-600">
                              {formatCurrency(billing.c228)}
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-purple-600">
                              {formatCurrency(billing.c229)}
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-purple-600">
                              {formatCurrency(billing.c230)}
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-purple-600">
                              {formatCurrency(billing.c231)}
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-orange-100">
                    <tr className="font-bold">
                      <td colSpan={2} className="px-3 py-3 text-sm text-orange-900">TOTAL</td>
                      <td className="px-3 py-3 text-sm text-orange-900">
                        {formatCurrency(currentBilling.reduce((sum, b) => sum + b.c228, 0))}
                      </td>
                      <td className="px-3 py-3 text-sm text-orange-900">
                        {formatCurrency(currentBilling.reduce((sum, b) => sum + b.c229, 0))}
                      </td>
                      <td className="px-3 py-3 text-sm text-orange-900">
                        {formatCurrency(currentBilling.reduce((sum, b) => sum + b.c230, 0))}
                      </td>
                      <td className="px-3 py-3 text-sm text-orange-900">
                        {formatCurrency(currentBilling.reduce((sum, b) => sum + b.c231, 0))}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>

          {/* Résumé facturation - 1/4 de la largeur */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-orange-500 to-orange-700 rounded-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">📊 Totaux par Navire</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-orange-100">C228 NLT1</p>
                  <p className="text-xl font-bold">
                    {formatCurrency(currentBilling.reduce((sum, b) => sum + b.c228, 0))}
                  </p>
                </div>
                <div>
                  <p className="text-orange-100">C229 NLT2</p>
                  <p className="text-xl font-bold">
                    {formatCurrency(currentBilling.reduce((sum, b) => sum + b.c229, 0))}
                  </p>
                </div>
                <div>
                  <p className="text-orange-100">C230 NLT3</p>
                  <p className="text-xl font-bold">
                    {formatCurrency(currentBilling.reduce((sum, b) => sum + b.c230, 0))}
                  </p>
                </div>
                <div>
                  <p className="text-orange-100">C231 NLT4</p>
                  <p className="text-xl font-bold">
                    {formatCurrency(currentBilling.reduce((sum, b) => sum + b.c231, 0))}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">💰 Total Général</h3>
              <div className="text-center">
                <p className="text-green-100">Total Facturation</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(
                    currentBilling.reduce((sum, b) => sum + b.c228 + b.c229 + b.c230 + b.c231, 0)
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}