'use client'

import React, { useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface ClaimEntry {
  id: number
  description: string
  claimNumber: number
  amount: number
  taxRate: 5 | 15 | 14
  taxAmount: number
  totalToDate: number
  category?: string
}

interface PaymentClaimFormProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: ClaimEntry[]) => void
}

const PaymentClaimForm: React.FC<PaymentClaimFormProps> = ({ isOpen, onClose, onSave }) => {
  // Données complètes extraites des images fournies (sans doublons)
  const [claimEntries, setClaimEntries] = useState<ClaimEntry[]>([
    // Milestone 3 Payments
    { id: 1, description: "Milestone 3 Payment #1 C-228", claimNumber: 1, amount: 131656.25, taxRate: 5, taxAmount: 6582.81, totalToDate: 138239.06, category: "Milestone 3" },
    { id: 2, description: "Milestone 3 Payment #2 C-229", claimNumber: 2, amount: 131656.25, taxRate: 5, taxAmount: 6582.81, totalToDate: 138239.06, category: "Milestone 3" },
    { id: 3, description: "Milestone 3 Payment #3 C-230", claimNumber: 3, amount: 131656.25, taxRate: 15, taxAmount: 19748.44, totalToDate: 151404.69, category: "Milestone 3" },
    { id: 4, description: "Milestone 3 Payment #4 C-231", claimNumber: 4, amount: 131656.25, taxRate: 15, taxAmount: 19748.44, totalToDate: 151404.69, category: "Milestone 3" },
    
    // Milestone 1 Claims
    { id: 5, description: "Milestone 1 Claim 5 C-228", claimNumber: 5, amount: 439863.61, taxRate: 5, taxAmount: 21993.18, totalToDate: 461856.79, category: "Milestone 1" },
    { id: 6, description: "Milestone 1 Claim 6 C-229", claimNumber: 6, amount: 439863.61, taxRate: 5, taxAmount: 21993.18, totalToDate: 461856.79, category: "Milestone 1" },
    { id: 7, description: "Milestone 1 Claim 7 C-230", claimNumber: 7, amount: 439863.60, taxRate: 15, taxAmount: 65979.54, totalToDate: 505843.14, category: "Milestone 1" },
    { id: 8, description: "Milestone 1 Claim 8 C-231", claimNumber: 8, amount: 439863.60, taxRate: 15, taxAmount: 65979.54, totalToDate: 505843.14, category: "Milestone 1" },
    
    // Milestone 2 Claims
    { id: 9, description: "Milestone 2 Claim 9 C-228", claimNumber: 9, amount: 879727.21, taxRate: 5, taxAmount: 43986.36, totalToDate: 923713.57, category: "Milestone 2" },
    { id: 10, description: "Milestone 2 Claim 10 C-229", claimNumber: 10, amount: 879727.21, taxRate: 5, taxAmount: 43986.36, totalToDate: 923713.57, category: "Milestone 2" },
    { id: 11, description: "Milestone 2 Claim 11 C-230", claimNumber: 11, amount: 879727.21, taxRate: 15, taxAmount: 131959.08, totalToDate: 1011686.29, category: "Milestone 2" },
    { id: 12, description: "Milestone 2 Claim 12 C-231", claimNumber: 12, amount: 879727.21, taxRate: 15, taxAmount: 131959.08, totalToDate: 1011686.29, category: "Milestone 2" },
    
    // Milestone 4 Claims
    { id: 13, description: "Milestone 4a Claim 13 C-228", claimNumber: 13, amount: 36125.12, taxRate: 5, taxAmount: 1806.26, totalToDate: 37931.38, category: "Milestone 4" },
    { id: 14, description: "Milestone 4a Claim 14 C-229", claimNumber: 14, amount: 36125.12, taxRate: 5, taxAmount: 1806.26, totalToDate: 37931.38, category: "Milestone 4" },
    { id: 15, description: "Milestone 4a Claim 15 C-230", claimNumber: 15, amount: 36125.13, taxRate: 15, taxAmount: 5418.77, totalToDate: 41543.90, category: "Milestone 4" },
    { id: 16, description: "Milestone 4a Claim 16 C-231", claimNumber: 16, amount: 36125.13, taxRate: 15, taxAmount: 5418.77, totalToDate: 41543.90, category: "Milestone 4" },
    
    // Milestone 5 Claims
    { id: 17, description: "Milestone 5a Claim 17 C-228", claimNumber: 17, amount: 506009.87, taxRate: 5, taxAmount: 25300.49, totalToDate: 531310.36, category: "Milestone 5" },
    { id: 18, description: "Milestone 5a Claim 18 C-229", claimNumber: 18, amount: 506009.87, taxRate: 5, taxAmount: 25300.49, totalToDate: 531310.36, category: "Milestone 5" },
    { id: 19, description: "Milestone 5a Claim 19 C-230", claimNumber: 19, amount: 506009.87, taxRate: 15, taxAmount: 75901.48, totalToDate: 581911.35, category: "Milestone 5" },
    { id: 20, description: "Milestone 5a Claim 20 C-231", claimNumber: 20, amount: 506009.87, taxRate: 15, taxAmount: 75901.48, totalToDate: 581911.35, category: "Milestone 5" },
    
    // Milestone 6 Claims
    { id: 21, description: "Milestone 6a Claim 21 C-228", claimNumber: 21, amount: 442084.25, taxRate: 5, taxAmount: 22104.21, totalToDate: 464188.46, category: "Milestone 6" },
    { id: 22, description: "Milestone 6a Claim 22 C-229", claimNumber: 22, amount: 442084.25, taxRate: 5, taxAmount: 22104.21, totalToDate: 464188.46, category: "Milestone 6" },
    { id: 23, description: "Milestone 6a Claim 23 C-230", claimNumber: 23, amount: 442084.25, taxRate: 15, taxAmount: 66312.64, totalToDate: 508396.89, category: "Milestone 6" },
    { id: 24, description: "Milestone 6a Claim 24 C-231", claimNumber: 24, amount: 442084.25, taxRate: 15, taxAmount: 66312.64, totalToDate: 508396.89, category: "Milestone 6" },
    
    // Milestone 12.a Claims
    { id: 25, description: "Milestone 12.a Claim 25 C-228", claimNumber: 25, amount: 87990.00, taxRate: 5, taxAmount: 4399.50, totalToDate: 92389.50, category: "Milestone 12" },
    { id: 26, description: "Milestone 12.a Claim 26 C-229", claimNumber: 26, amount: 87990.00, taxRate: 5, taxAmount: 4399.50, totalToDate: 92389.50, category: "Milestone 12" },
    { id: 27, description: "Milestone 12.a Claim 27 C-230", claimNumber: 27, amount: 87990.00, taxRate: 15, taxAmount: 13198.50, totalToDate: 101188.50, category: "Milestone 12" },
    { id: 28, description: "Milestone 12.a Claim 28 C-231", claimNumber: 28, amount: 87990.00, taxRate: 15, taxAmount: 13198.50, totalToDate: 101188.50, category: "Milestone 12" },
    
    // Milestone 14.a Claims
    { id: 29, description: "Milestone 14.a Claim 29 C-228", claimNumber: 29, amount: 3429.00, taxRate: 5, taxAmount: 171.45, totalToDate: 3600.45, category: "Milestone 14" },
    { id: 30, description: "Milestone 14.a Claim 30 C-229", claimNumber: 30, amount: 3429.00, taxRate: 5, taxAmount: 171.45, totalToDate: 3600.45, category: "Milestone 14" },
    { id: 31, description: "Milestone 14.a Claim 31 C-230", claimNumber: 31, amount: 3429.00, taxRate: 15, taxAmount: 514.35, totalToDate: 3943.35, category: "Milestone 14" },
    { id: 32, description: "Milestone 14.a Claim 32 C-231", claimNumber: 32, amount: 3429.00, taxRate: 15, taxAmount: 514.35, totalToDate: 3943.35, category: "Milestone 14" },
    
    // Milestone 4.b Claims
    { id: 33, description: "Milestone 4.b Claim 33 C-228", claimNumber: 33, amount: 2603056.50, taxRate: 5, taxAmount: 130152.83, totalToDate: 2733209.33, category: "Milestone 4" },
    { id: 34, description: "Milestone 4.b Claim 34 C-229", claimNumber: 34, amount: 2603056.50, taxRate: 5, taxAmount: 130152.83, totalToDate: 2733209.33, category: "Milestone 4" },
    { id: 35, description: "Milestone 4.b Claim 35 C-230", claimNumber: 35, amount: 2603056.50, taxRate: 15, taxAmount: 390458.48, totalToDate: 2993514.98, category: "Milestone 4" },
    { id: 36, description: "Milestone 4.b Claim 36 C-231", claimNumber: 36, amount: 2603056.50, taxRate: 15, taxAmount: 390458.48, totalToDate: 2993514.98, category: "Milestone 4" },
    
    // Milestone 5.b Claims
    { id: 37, description: "Milestone 5.b Claim 37 C-228", claimNumber: 37, amount: 1253444.55, taxRate: 5, taxAmount: 62672.23, totalToDate: 1316116.78, category: "Milestone 5" },
    
    // DCR Claims
    { id: 38, description: "DCR-001-ENG - Exterior Watertight Power Receptacles", claimNumber: 38, amount: 2660.00, taxRate: 5, taxAmount: 133.00, totalToDate: 2793.00, category: "DCR" },
    { id: 39, description: "DCR-016-ENG - Deck Crane Upgrade", claimNumber: 38, amount: 18900.00, taxRate: 5, taxAmount: 945.00, totalToDate: 19845.00, category: "DCR" },
    { id: 40, description: "DCR-025-ENG - Power Lashing to Submarines", claimNumber: 38, amount: 18400.00, taxRate: 5, taxAmount: 920.00, totalToDate: 19320.00, category: "DCR" },
    { id: 41, description: "DCR-027-ENG - Grey Water Treatment Capability", claimNumber: 38, amount: 14770.00, taxRate: 5, taxAmount: 738.50, totalToDate: 15508.50, category: "DCR" },
    { id: 42, description: "DCR-017-ENG EARLY ORDER OF MATERIAL ASSESSMENT", claimNumber: 39, amount: 68180.00, taxRate: 5, taxAmount: 3409.00, totalToDate: 71589.00, category: "DCR" },
    { id: 43, description: "DCR-004-ENG - Upgrade of 5 skyport to heated skyport", claimNumber: 40, amount: 22400.00, taxRate: 5, taxAmount: 1120.00, totalToDate: 23520.00, category: "DCR" },
    { id: 44, description: "DCR-006-ENG Tie-Downs on Aft Deck", claimNumber: 41, amount: 9100.00, taxRate: 5, taxAmount: 455.00, totalToDate: 9555.00, category: "DCR" },
    { id: 45, description: "DCR-008-Pyrotechnics Locker", claimNumber: 42, amount: 15600.00, taxRate: 5, taxAmount: 780.00, totalToDate: 16380.00, category: "DCR" },
    { id: 46, description: "DCR-011-ENG - Connecting to Shore Power", claimNumber: 43, amount: 27300.00, taxRate: 5, taxAmount: 1365.00, totalToDate: 28665.00, category: "DCR" },
    { id: 47, description: "DCR-013-ENG - Connecting to Shore Power", claimNumber: 44, amount: 7000.00, taxRate: 5, taxAmount: 350.00, totalToDate: 7350.00, category: "DCR" },
    { id: 48, description: "DCR-014-ENG - Storage Cabinets in Z Drive", claimNumber: 45, amount: 5180.00, taxRate: 5, taxAmount: 259.00, totalToDate: 5439.00, category: "DCR" },
    { id: 49, description: "DCR-015-ENG - Exterior Superstructure Light Fixtures", claimNumber: 46, amount: 3640.00, taxRate: 5, taxAmount: 182.00, totalToDate: 3822.00, category: "DCR" },
    
    // Milestone 6.b.1
    { id: 50, description: "Milestone 6.b.1 Claim 47", claimNumber: 47, amount: 877506.57, taxRate: 5, taxAmount: 43875.33, totalToDate: 921381.90, category: "Milestone 6" },
    { id: 51, description: "DCR-007-ENG - Addition of storage locker for NERT", claimNumber: 48, amount: 15400.00, taxRate: 5, taxAmount: 770.00, totalToDate: 16170.00, category: "DCR" },
    { id: 52, description: "Milestone 5.b.1", claimNumber: 49, amount: 1253444.55, taxRate: 5, taxAmount: 62672.23, totalToDate: 1316116.78, category: "Milestone 5" },
    
    // Milestone 7 Claims
    { id: 53, description: "Milestone 7.1", claimNumber: 50, amount: 2199318.03, taxRate: 5, taxAmount: 109965.90, totalToDate: 2309283.93, category: "Milestone 7" },
    
    // COVID Claims
    { id: 54, description: "DCR-019 COVID-19 Health and Safety Measures Nov 2020-March 2021", claimNumber: 51, amount: 125500.66, taxRate: 5, taxAmount: 6275.03, totalToDate: 131775.69, category: "COVID-19" },
    { id: 55, description: "DCR-019 COVID-19 Health and Safety Measures April 2021-February 2022", claimNumber: 51, amount: 400027.11, taxRate: 5, taxAmount: 20001.36, totalToDate: 420028.47, category: "COVID-19" },
    { id: 56, description: "DCR-019 COVID-19 Health and Safety Measures March 2022", claimNumber: 52, amount: 61287.17, taxRate: 5, taxAmount: 3064.36, totalToDate: 64351.53, category: "COVID-19" },
    { id: 57, description: "DCR-019 COVID-19 Health and Safety Measures April 2022", claimNumber: 53, amount: 74652.20, taxRate: 5, taxAmount: 3732.61, totalToDate: 78384.81, category: "COVID-19" },
    { id: 58, description: "DCR-019 COVID-19 Health and Safety Measures May 2022", claimNumber: 56, amount: 57320.63, taxRate: 5, taxAmount: 2866.03, totalToDate: 60186.66, category: "COVID-19" },
    
    // More Claims
    { id: 59, description: "Milestone 6.2.b", claimNumber: 57, amount: 877506.57, taxRate: 5, taxAmount: 43875.33, totalToDate: 921381.90, category: "Milestone 6" },
    { id: 60, description: "DCR-025-C-228 Power Lashing to Submarines", claimNumber: 58, amount: 103501.66, taxRate: 5, taxAmount: 5175.08, totalToDate: 108676.74, category: "DCR" },
    { id: 61, description: "DCR-025-C-229 Power Lashing to Submarines", claimNumber: 58, amount: 95998.34, taxRate: 5, taxAmount: 4799.92, totalToDate: 100798.26, category: "DCR" },
    
    // Prime Movers Claims
    { id: 62, description: "Milestone 8.2.a Prime Movers installed and accepted by Canada C-229", claimNumber: 59, amount: 879727.21, taxRate: 5, taxAmount: 43986.36, totalToDate: 923713.57, category: "Milestone 8" },
    { id: 63, description: "Milestone 8.1.a Prime Movers installed and accepted by Canada C-228", claimNumber: 61, amount: 879727.21, taxRate: 5, taxAmount: 43986.36, totalToDate: 923713.57, category: "Milestone 8" },
    
    // Heated Skyports
    { id: 64, description: "DCR-004 Heated Skyports C-228", claimNumber: 62, amount: 14157.00, taxRate: 5, taxAmount: 707.85, totalToDate: 14864.85, category: "DCR" },
    { id: 65, description: "DCR-004 Heated Skyports C-229", claimNumber: 62, amount: 13728.00, taxRate: 5, taxAmount: 686.40, totalToDate: 14414.40, category: "DCR" },
    
    // More DCR Claims
    { id: 66, description: "DCR-009 ENG", claimNumber: 64, amount: 27853.20, taxRate: 5, taxAmount: 1392.66, totalToDate: 29245.86, category: "DCR" },
    { id: 67, description: "DCR-009 Space Heaters C-228", claimNumber: 64, amount: 97627.60, taxRate: 5, taxAmount: 4881.38, totalToDate: 102508.98, category: "DCR" },
    { id: 68, description: "DCR-027-Grey Water Treatment C-228", claimNumber: 66, amount: 44676.18, taxRate: 5, taxAmount: 2233.81, totalToDate: 46909.99, category: "DCR" },
    
    // COVID Subcontractor Claims
    { id: 69, description: "DCR-020 COVID-19 Subcontractor Cost Assistance - January - March 2022", claimNumber: 67, amount: 977272.16, taxRate: 5, taxAmount: 48863.61, totalToDate: 1026135.77, category: "COVID-19" },
    
    // Milestone 7.2b
    { id: 70, description: "Milestone #7.2b/Hull, deck and wheelhouse enclosed and accepted by Canada", claimNumber: 68, amount: 2199318.03, taxRate: 5, taxAmount: 109965.90, totalToDate: 2309283.93, category: "Milestone 7" },
    
    // Milestone 8.1.b
    { id: 71, description: "Milestone #8.1.b Prime Movers Alignment", claimNumber: 70, amount: 1319590.82, taxRate: 5, taxAmount: 65979.54, totalToDate: 1385570.36, category: "Milestone 8" },
    
    // Milestone 16 Claims
    { id: 72, description: "Milestone # 16.a Completion Aboriginal Report C-228, C-229", claimNumber: 71, amount: 219931.80, taxRate: 5, taxAmount: 10996.59, totalToDate: 230928.39, category: "Milestone 16" },
    { id: 73, description: "Milestone # 16.a Completion Aboriginal Report C-228, C-229", claimNumber: 71, amount: 219931.80, taxRate: 15, taxAmount: 32989.77, totalToDate: 252921.57, category: "Milestone 16" },
    
    // Milestone 5.3.b
    { id: 74, description: "Milestone # 5.3.b Delivery of Propulsion Machinery by ship set to shipyard", claimNumber: 72, amount: 1253444.55, taxRate: 15, taxAmount: 188016.68, totalToDate: 1441461.23, category: "Milestone 5" },
    
    // DCR-020 COVID Claims
    { id: 75, description: "DCR-020 COVID-19 Subcontractor Cost Assistance - April, May, June 2022", claimNumber: 73, amount: 1492798.45, taxRate: 5, taxAmount: 74639.92, totalToDate: 1567438.37, category: "COVID-19" },
    
    // Milestone 6.3.b
    { id: 76, description: "Milestone #6.3.b Delivery of Electrical Equipment", claimNumber: 74, amount: 877506.57, taxRate: 15, taxAmount: 131625.99, totalToDate: 1009132.56, category: "Milestone 6" },
    
    // More COVID Claims
    { id: 77, description: "DCR-020 COVID19 Subcontractor cost assistance July 2022", claimNumber: 75, amount: 485299.91, taxRate: 5, taxAmount: 24265.00, totalToDate: 509564.91, category: "COVID-19" },
    { id: 78, description: "DCR-020 COVID19 Subcontractor cost assistance August 2022", claimNumber: 76, amount: 550343.25, taxRate: 5, taxAmount: 27517.16, totalToDate: 577860.41, category: "COVID-19" },
    
    // Additional Milestone Claims
    { id: 79, description: "Claim Milestone 5.4.b Delivery of propulsion machinery", claimNumber: 77, amount: 1253444.55, taxRate: 15, taxAmount: 188016.68, totalToDate: 1441461.23, category: "Milestone 5" },
    { id: 80, description: "Claim Milestone 6.4b Delivery of Electrical Equipment Package", claimNumber: 78, amount: 877506.57, taxRate: 15, taxAmount: 131625.99, totalToDate: 1009132.56, category: "Milestone 6" },
    
    // Milestone 16.b Claims
    { id: 81, description: "Milestone 16.b Completion Aboriginal Report C-228, C-229", claimNumber: 79, amount: 219931.80, taxRate: 5, taxAmount: 10996.59, totalToDate: 230928.39, category: "Milestone 16" },
    { id: 82, description: "Milestone 16.b Completion Aboriginal Report C-230, C-231", claimNumber: 79, amount: 219931.80, taxRate: 15, taxAmount: 32989.77, totalToDate: 252921.57, category: "Milestone 16" },
    
    // CVM Template Claims
    { id: 83, description: "Milestone 10.1 C-228 CVM Template", claimNumber: 80, amount: 109965.90, taxRate: 5, taxAmount: 5498.30, totalToDate: 115464.20, category: "Milestone 10" },
    { id: 84, description: "Milestone 10.1 C-229 CVM Template", claimNumber: 80, amount: 109965.90, taxRate: 5, taxAmount: 5498.30, totalToDate: 115464.20, category: "Milestone 10" },
    { id: 85, description: "Milestone 10.1 C-230 CVM Template", claimNumber: 80, amount: 109965.90, taxRate: 15, taxAmount: 16494.89, totalToDate: 126460.79, category: "Milestone 10" },
    { id: 86, description: "Milestone 10.1 C-231 CVM Template", claimNumber: 80, amount: 109965.90, taxRate: 15, taxAmount: 16494.89, totalToDate: 126460.79, category: "Milestone 10" },
    
    // ILS Documents
    { id: 87, description: "Milestone 13.1 ILS documents (Draft) received and accepted (NLT1 and NLT2)", claimNumber: 81, amount: 131959.08, taxRate: 5, taxAmount: 6597.95, totalToDate: 138557.03, category: "Milestone 13" },
    { id: 88, description: "Milestone 13.1 ILS documents (Draft) received and accepted (NLT3 and NLT4)", claimNumber: 81, amount: 131959.08, taxRate: 15, taxAmount: 19793.86, totalToDate: 151752.94, category: "Milestone 13" },
    
    // Final Large Claims
    { id: 89, description: "C-228 Milestone 11.1 Delivery and Final Acceptance of vessels complete at respective CFR bases (Holdback a facturer)", claimNumber: 120, amount: 3194980.92, taxRate: 5, taxAmount: 159749.05, totalToDate: 3354729.97, category: "Milestone 11" },
    { id: 90, description: "C-229 Milestone 11.2 Delivery and Final Acceptance of vessels complete at respective CFR bases (Holdback a facturer)", claimNumber: 120, amount: 3148000.91, taxRate: 5, taxAmount: 157400.05, totalToDate: 3305400.96, category: "Milestone 11" },
    
    // EPA Adjustments
    { id: 91, description: "C-228 Milestone 17 EPA Adjustment", claimNumber: 121, amount: 2000000.00, taxRate: 5, taxAmount: 100000.00, totalToDate: 2100000.00, category: "Milestone 17" },
    { id: 92, description: "C-229 Milestone 17 EPA Adjustment", claimNumber: 121, amount: 2000000.00, taxRate: 5, taxAmount: 100000.00, totalToDate: 2100000.00, category: "Milestone 17" },
    
    // Technical Data Package
    { id: 93, description: "C-228 Milestone 13.1b All Technical Data Package elements delivered and accepted by Canada", claimNumber: 122, amount: 593815.87, taxRate: 5, taxAmount: 29690.79, totalToDate: 623506.66, category: "Milestone 13" },
    { id: 94, description: "C-229 Milestone 13.2b All Technical Data Package elements delivered and accepted by Canada", claimNumber: 122, amount: 593815.87, taxRate: 5, taxAmount: 29690.79, totalToDate: 623506.66, category: "Milestone 13" },
    
    // Final Delivery Claims
    { id: 95, description: "C-228 Milestones 19.a Final Delivery to Destination of NLT1 and all Contractual Deliverables Completed and Accepted by Canada for your review and payment.", claimNumber: 123, amount: 3000000.00, taxRate: 5, taxAmount: 150000.00, totalToDate: 3150000.00, category: "Milestone 19" },
    { id: 96, description: "C-229 Milestones 19.b Final Delivery to Destination of NLT21 and all Contractual Deliverables Completed and Accepted by Canada for your review and payment.", claimNumber: 123, amount: 3000000.00, taxRate: 5, taxAmount: 150000.00, totalToDate: 3150000.00, category: "Milestone 19" },
    
    // Pre-Requisites Claims
    { id: 97, description: "Claim 124 C-228 Milestone 9.1b Pre-Requisites Complete and accepted by Canada (Commissioning, Flushing, ITP)", claimNumber: 124, amount: 329897.70, taxRate: 5, taxAmount: 16494.89, totalToDate: 346392.59, category: "Milestone 9" },
    { id: 98, description: "Claim 124 C-229 Milestone 9.2b Pre-Requisites Complete and accepted by Canada (Commissioning, Flushing, ITP)", claimNumber: 124, amount: 329897.70, taxRate: 5, taxAmount: 16494.89, totalToDate: 346392.59, category: "Milestone 9" },
    
    // Deckhouse Complete Claims
    { id: 99, description: "Claim 126 Milestone 7.3a Deckhouse Complete and accepted by Canada", claimNumber: 126, amount: 329897.71, taxRate: 15, taxAmount: 49484.66, totalToDate: 379382.37, category: "Milestone 7" },
    
    // Transportation Claims
    { id: 100, description: "Claim 127 C-228 - DCR-22 Transportation to Esquimalt", claimNumber: 127, amount: 534977.77, taxRate: 5, taxAmount: 26748.89, totalToDate: 561726.66, category: "DCR" },
    { id: 101, description: "Claim 127 C-229 - DCR-22 Transportation to Esquimalt", claimNumber: 127, amount: 534977.77, taxRate: 5, taxAmount: 26748.89, totalToDate: 561726.66, category: "DCR" },
    
    // Winches Upgrade
    { id: 102, description: "Claim 128 C-228 - DCR-28 Winches Upgrade", claimNumber: 128, amount: 505961.34, taxRate: 5, taxAmount: 25298.07, totalToDate: 531259.41, category: "DCR" },
    { id: 103, description: "Claim 129 C-229- DCR-28 Upgrade for the THR Winches by DMT", claimNumber: 129, amount: 467179.48, taxRate: 5, taxAmount: 23358.97, totalToDate: 490538.45, category: "DCR" },
    
    // Prime Movers 14% Tax Claims
    { id: 104, description: "Claim 133 C-230 Milestone 8.3a Prime Movers Installed and Accepted by Canada", claimNumber: 133, amount: 879727.21, taxRate: 14, taxAmount: 123161.81, totalToDate: 1002889.02, category: "Milestone 8" },
    { id: 105, description: "Claim 134 C-230 Milestone 7.3b Hull enclosed and accepted by Canada", claimNumber: 134, amount: 989693.11, taxRate: 14, taxAmount: 138557.04, totalToDate: 1128250.15, category: "Milestone 7" },
    { id: 106, description: "Claim 135 DCR-037 - C-00230 - Fender modification Signed and Accepted by Canada", claimNumber: 135, amount: 7903.00, taxRate: 14, taxAmount: 1106.42, totalToDate: 9009.42, category: "DCR" },
    { id: 107, description: "Claim 136 C-230 - Milestone 7.3c Deckhouse and hull assembly complete and accepted by Canada", claimNumber: 136, amount: 879727.21, taxRate: 14, taxAmount: 123161.81, totalToDate: 1002889.02, category: "Milestone 7" }
  ])

  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({})

  const getTotalAmount = () => {
    return claimEntries.reduce((sum, entry) => sum + entry.amount, 0)
  }

  const getTotalTax = () => {
    return claimEntries.reduce((sum, entry) => sum + entry.taxAmount, 0)
  }

  const getGrandTotal = () => {
    return claimEntries.reduce((sum, entry) => sum + entry.totalToDate, 0)
  }

  const groupedEntries = claimEntries.reduce((groups, entry) => {
    const category = entry.category || 'Other'
    if (!groups[category]) {
      groups[category] = []
    }
    groups[category].push(entry)
    return groups
  }, {} as Record<string, ClaimEntry[]>)

  const toggleSection = (category: string) => {
    setCollapsedSections(prev => ({
      ...prev,
      [category]: !prev[category]
    }))
  }

  const handleSave = () => {
    onSave(claimEntries)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="bg-blue-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            title="Fermer le formulaire"
            aria-label="Fermer le formulaire"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">OCEAN FACTORY</h1>
            <h2 className="text-lg">PAYMENT CLAIM - COMPLET</h2>
            <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
              <div>Contrats: C-228, C-229, C-230, C-231</div>
              <div>Date: {new Date().toLocaleDateString()}</div>
              <div>Total Claims: {claimEntries.length}</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-auto max-h-[60vh] p-6">
          {Object.entries(groupedEntries)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([category, entries]) => (
            <div key={category} className="mb-6">
              <button
                onClick={() => toggleSection(category)}
                className="w-full text-left"
              >
                <h3 className="text-lg font-semibold mb-4 bg-gray-100 p-3 rounded hover:bg-gray-200 transition-colors flex justify-between items-center">
                  <span>{category} ({entries.length} items - ${entries.reduce((sum, e) => sum + e.totalToDate, 0).toLocaleString('en-US', { minimumFractionDigits: 2 })})</span>
                  <span className="text-sm">
                    {collapsedSections[category] ? '▼' : '▲'}
                  </span>
                </h3>
              </button>
              
              {!collapsedSections[category] && (
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-300 text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="border border-gray-300 px-2 py-2 text-left w-1/2">DESCRIPTION</th>
                        <th className="border border-gray-300 px-2 py-2 text-center w-16">Claim #</th>
                        <th className="border border-gray-300 px-2 py-2 text-right w-32">Claim amount</th>
                        <th className="border border-gray-300 px-2 py-2 text-center w-20">Tax rate</th>
                        <th className="border border-gray-300 px-2 py-2 text-right w-32">Tax amount</th>
                        <th className="border border-gray-300 px-2 py-2 text-right w-32">Total to date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {entries.map((entry) => (
                        <tr key={entry.id} className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-2 py-2">{entry.description}</td>
                          <td className="border border-gray-300 px-2 py-2 text-center">{entry.claimNumber}</td>
                          <td className="border border-gray-300 px-2 py-2 text-right">
                            ${entry.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </td>
                          <td className="border border-gray-300 px-2 py-2 text-center">{entry.taxRate}%</td>
                          <td className="border border-gray-300 px-2 py-2 text-right">
                            ${entry.taxAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </td>
                          <td className="border border-gray-300 px-2 py-2 text-right font-semibold">
                            ${entry.totalToDate.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-gray-50 p-6 border-t">
          <div className="grid grid-cols-3 gap-4 text-lg font-semibold">
            <div>
              <span className="text-gray-600">Total Amount:</span>
              <div className="text-blue-600">${getTotalAmount().toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
            </div>
            <div>
              <span className="text-gray-600">Total Tax:</span>
              <div className="text-green-600">${getTotalTax().toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
            </div>
            <div>
              <span className="text-gray-600">Grand Total:</span>
              <div className="text-red-600 text-xl">${getGrandTotal().toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4 p-6 border-t bg-white">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Sauvegarder
          </button>
        </div>
      </div>
    </div>
  )
}

export default PaymentClaimForm