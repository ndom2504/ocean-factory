// Externalized dataset for PaymentClaimForm
// New lines (from screenshot) appended after existing id 37 with placeholder numeric values.

export interface PaymentClaimItem {
  id: number
  description: string
  claimNumber: number
  claimAmount: number
  taxRate5: boolean
  taxRate15: boolean
  taxAmount: number
  totalToDate: number
  group: string
  groupLabel: string
}

export const paymentClaimItems: PaymentClaimItem[] = [
  { id: 1, description: 'Milestone 3 Payment #1 C-228', claimNumber: 1, claimAmount: 131656.25, taxRate5: true, taxRate15: false, taxAmount: 6582.81, totalToDate: 138239.06, group: 'M3', groupLabel: 'Milestone #3' },
  { id: 2, description: 'Milestone 3 Payment #2 C-229', claimNumber: 2, claimAmount: 131656.25, taxRate5: true, taxRate15: false, taxAmount: 6582.81, totalToDate: 138239.06, group: 'M3', groupLabel: 'Milestone #3' },
  { id: 3, description: 'Milestone 3 Payment #3 C-230', claimNumber: 3, claimAmount: 131656.25, taxRate5: false, taxRate15: true, taxAmount: 19748.44, totalToDate: 151404.69, group: 'M3', groupLabel: 'Milestone #3' },
  { id: 4, description: 'Milestone 3 Payment #4 C-231', claimNumber: 4, claimAmount: 131656.25, taxRate5: false, taxRate15: true, taxAmount: 19748.44, totalToDate: 151404.69, group: 'M3', groupLabel: 'Milestone #3' },
  { id: 5, description: 'Milestone 1 Claim 5 C-228', claimNumber: 5, claimAmount: 439863.61, taxRate5: true, taxRate15: false, taxAmount: 21993.18, totalToDate: 461856.79, group: 'M1', groupLabel: 'Milestone #1' },
  { id: 6, description: 'Milestone 1 Claim 6 C-229', claimNumber: 6, claimAmount: 439863.61, taxRate5: true, taxRate15: false, taxAmount: 21993.18, totalToDate: 461856.79, group: 'M1', groupLabel: 'Milestone #1' },
  { id: 7, description: 'Milestone 1 Claim 7 C-230', claimNumber: 7, claimAmount: 439863.60, taxRate5: false, taxRate15: true, taxAmount: 65979.54, totalToDate: 505843.14, group: 'M1', groupLabel: 'Milestone #1' },
  { id: 8, description: 'Milestone 1 Claim 8 C-231', claimNumber: 8, claimAmount: 439863.60, taxRate5: false, taxRate15: true, taxAmount: 65979.54, totalToDate: 505843.14, group: 'M1', groupLabel: 'Milestone #1' },
  { id: 9, description: 'Milestone 2 Claim 9  C-228', claimNumber: 9, claimAmount: 879727.21, taxRate5: true, taxRate15: false, taxAmount: 43986.36, totalToDate: 923713.57, group: 'M2', groupLabel: 'Milestone #2' },
  { id: 10, description: 'Milestone 2 Claim 10  C-229', claimNumber: 10, claimAmount: 879727.21, taxRate5: true, taxRate15: false, taxAmount: 43986.36, totalToDate: 923713.57, group: 'M2', groupLabel: 'Milestone #2' },
  { id: 11, description: 'Milestone 2 Claim 11  C-230', claimNumber: 11, claimAmount: 879727.21, taxRate5: false, taxRate15: true, taxAmount: 131959.08, totalToDate: 1011686.29, group: 'M2', groupLabel: 'Milestone #2' },
  { id: 12, description: 'Milestone 2 Claim 12  C-231', claimNumber: 12, claimAmount: 879727.21, taxRate5: false, taxRate15: true, taxAmount: 131959.08, totalToDate: 1011686.29, group: 'M2', groupLabel: 'Milestone #2' },
  { id: 13, description: 'Milestone 4.a Claim 13 C-228', claimNumber: 13, claimAmount: 36125.12, taxRate5: true, taxRate15: false, taxAmount: 1806.26, totalToDate: 37931.38, group: 'M4A', groupLabel: 'Milestone #4.a' },
  { id: 14, description: 'Milestone 4.a Claim 14 C-229', claimNumber: 14, claimAmount: 36125.12, taxRate5: true, taxRate15: false, taxAmount: 1806.26, totalToDate: 37931.38, group: 'M4A', groupLabel: 'Milestone #4.a' },
  { id: 15, description: 'Milestone 4.a Claim 15 C-230', claimNumber: 15, claimAmount: 36125.13, taxRate5: false, taxRate15: true, taxAmount: 5418.77, totalToDate: 41543.90, group: 'M4A', groupLabel: 'Milestone #4.a' },
  { id: 16, description: 'Milestone 4.a Claim 16 C-231', claimNumber: 16, claimAmount: 36125.13, taxRate5: false, taxRate15: true, taxAmount: 5418.77, totalToDate: 41543.90, group: 'M4A', groupLabel: 'Milestone #4.a' },
  { id: 17, description: 'Milestone 5.a Claim 17 C-228', claimNumber: 17, claimAmount: 506009.87, taxRate5: true, taxRate15: false, taxAmount: 25300.49, totalToDate: 531310.36, group: 'M5A', groupLabel: 'Milestone #5.a' },
  { id: 18, description: 'Milestone 5.a Claim 18 C-229', claimNumber: 18, claimAmount: 506009.87, taxRate5: true, taxRate15: false, taxAmount: 25300.49, totalToDate: 531310.36, group: 'M5A', groupLabel: 'Milestone #5.a' },
  { id: 19, description: 'Milestone 5.a Claim 19 C-230', claimNumber: 19, claimAmount: 506009.87, taxRate5: false, taxRate15: true, taxAmount: 75901.48, totalToDate: 581911.35, group: 'M5A', groupLabel: 'Milestone #5.a' },
  { id: 20, description: 'Milestone 5.a Claim 20 C-231', claimNumber: 20, claimAmount: 506009.87, taxRate5: false, taxRate15: true, taxAmount: 75901.48, totalToDate: 581911.35, group: 'M5A', groupLabel: 'Milestone #5.a' },
  { id: 21, description: 'Milestone 6.a Claim 21 C-228', claimNumber: 21, claimAmount: 442084.25, taxRate5: true, taxRate15: false, taxAmount: 22104.21, totalToDate: 464188.46, group: 'M6A', groupLabel: 'Milestone #6.a' },
  { id: 22, description: 'Milestone 6.a Claim 22 C-229', claimNumber: 22, claimAmount: 442084.25, taxRate5: true, taxRate15: false, taxAmount: 22104.21, totalToDate: 464188.46, group: 'M6A', groupLabel: 'Milestone #6.a' },
  { id: 23, description: 'Milestone 6.a Claim 23 C-230', claimNumber: 23, claimAmount: 442084.25, taxRate5: false, taxRate15: true, taxAmount: 66312.64, totalToDate: 508396.89, group: 'M6A', groupLabel: 'Milestone #6.a' },
  { id: 24, description: 'Milestone 6.a Claim 24 C-231', claimNumber: 24, claimAmount: 442084.25, taxRate5: false, taxRate15: true, taxAmount: 66312.64, totalToDate: 508396.89, group: 'M6A', groupLabel: 'Milestone #6.a' },
  { id: 25, description: 'Milestone 12.a Claim 25 C-228', claimNumber: 25, claimAmount: 87990.00, taxRate5: true, taxRate15: false, taxAmount: 4399.50, totalToDate: 92389.50, group: 'M12A', groupLabel: 'Milestone #12.a' },
  { id: 26, description: 'Milestone 12.a Claim 26 C-229', claimNumber: 26, claimAmount: 87990.00, taxRate5: true, taxRate15: false, taxAmount: 4399.50, totalToDate: 92389.50, group: 'M12A', groupLabel: 'Milestone #12.a' },
  { id: 27, description: 'Milestone 12.a Claim 27 C-230', claimNumber: 27, claimAmount: 87990.00, taxRate5: false, taxRate15: true, taxAmount: 13198.50, totalToDate: 101188.50, group: 'M12A', groupLabel: 'Milestone #12.a' },
  { id: 28, description: 'Milestone 12.a Claim 28 C-231', claimNumber: 28, claimAmount: 87990.00, taxRate5: false, taxRate15: true, taxAmount: 13198.50, totalToDate: 101188.50, group: 'M12A', groupLabel: 'Milestone #12.a' },
  { id: 29, description: 'Milestone 14.a Claim 29 C-228', claimNumber: 29, claimAmount: 3429.00, taxRate5: true, taxRate15: false, taxAmount: 171.45, totalToDate: 3600.45, group: 'M14A', groupLabel: 'Milestone #14.a' },
  { id: 30, description: 'Milestone 14.a Claim 30 C-229', claimNumber: 30, claimAmount: 3429.00, taxRate5: true, taxRate15: false, taxAmount: 171.45, totalToDate: 3600.45, group: 'M14A', groupLabel: 'Milestone #14.a' },
  { id: 31, description: 'Milestone 14.a Claim 31 C-230', claimNumber: 31, claimAmount: 3429.00, taxRate5: false, taxRate15: true, taxAmount: 514.35, totalToDate: 3943.35, group: 'M14A', groupLabel: 'Milestone #14.a' },
  { id: 32, description: 'Milestone 14.a Claim 32 C-231', claimNumber: 32, claimAmount: 3429.00, taxRate5: false, taxRate15: true, taxAmount: 514.35, totalToDate: 3943.35, group: 'M14A', groupLabel: 'Milestone #14.a' },
  { id: 33, description: 'Milestone 4.b Claim 33 C-228', claimNumber: 33, claimAmount: 2603056.50, taxRate5: true, taxRate15: false, taxAmount: 130152.83, totalToDate: 2733209.33, group: 'M4B', groupLabel: 'Milestone #4.b' },
  { id: 34, description: 'Milestone 4.b Claim 34 C-229', claimNumber: 34, claimAmount: 2603056.50, taxRate5: true, taxRate15: false, taxAmount: 130152.83, totalToDate: 2733209.33, group: 'M4B', groupLabel: 'Milestone #4.b' },
  { id: 35, description: 'Milestone 4.b Claim 35 C-230', claimNumber: 35, claimAmount: 2603056.50, taxRate5: false, taxRate15: true, taxAmount: 390458.48, totalToDate: 2993514.98, group: 'M4B', groupLabel: 'Milestone #4.b' },
  { id: 36, description: 'Milestone 4.b Claim 36 C-231', claimNumber: 36, claimAmount: 2603056.50, taxRate5: false, taxRate15: true, taxAmount: 390458.48, totalToDate: 2993514.98, group: 'M4B', groupLabel: 'Milestone #4.b' },
  { id: 37, description: 'Milestone 5.b Claim 37 C-228', claimNumber: 37, claimAmount: 1253444.55, taxRate5: true, taxRate15: false, taxAmount: 62672.23, totalToDate: 1316116.78, group: 'M5B', groupLabel: 'Milestone #5.b' },
  // New DCR claims (placeholder numeric values; replace with real amounts)
  { id: 38, description: 'DCR-001-ENG - Exterior Watertight Power Receptacles', claimNumber: 38, claimAmount: 2660.00, taxRate5: true, taxRate15: false, taxAmount: 133.00, totalToDate: 2793.00, group: 'DCR', groupLabel: 'DCR Claims' },
  { id: 39, description: 'DCR-016-ENG - Deck Crane Upgrade', claimNumber: 38, claimAmount: 18900.00, taxRate5: true, taxRate15: false, taxAmount: 945.00, totalToDate: 19845.00, group: 'DCR', groupLabel: 'DCR Claims' },
  { id: 40, description: 'DCR-025-ENG - Power Lashing to Submarines', claimNumber: 38, claimAmount: 18400.00, taxRate5: true, taxRate15: false, taxAmount: 920.00, totalToDate: 19320.00, group: 'DCR', groupLabel: 'DCR Claims' },
  { id: 41, description: 'DCR-027-ENG - Grey Water Treatment Capability', claimNumber: 38, claimAmount: 14770.00, taxRate5: true, taxRate15: false, taxAmount: 738.50, totalToDate: 15508.50, group: 'DCR', groupLabel: 'DCR Claims' },
  { id: 42, description: 'DCR 017-ENG EARLY ORDER OF MATERIAL ASSESSMENT', claimNumber: 39, claimAmount: 68180.00, taxRate5: true, taxRate15: false, taxAmount: 3409.00, totalToDate: 71589.00, group: 'DCR', groupLabel: 'DCR Claims' },
  { id: 43, description: 'DCR-020-ENG - Upgrade of 5 skyport to heated skyport', claimNumber: 40, claimAmount: 22400.00, taxRate5: true, taxRate15: false, taxAmount: 1120.00, totalToDate: 23520.00, group: 'DCR', groupLabel: 'DCR Claims' },
  { id: 44, description: 'DCR-006-ENG Tie-Downs on Aft Deck', claimNumber: 41, claimAmount: 9100.00, taxRate5: true, taxRate15: false, taxAmount: 455.00, totalToDate: 9555.00, group: 'DCR', groupLabel: 'DCR Claims' },
  { id: 45, description: 'DCR-008-Pyrotechnics Locker', claimNumber: 42, claimAmount: 15600.00, taxRate5: true, taxRate15: false, taxAmount: 780.00, totalToDate: 16380.00, group: 'DCR', groupLabel: 'DCR Claims' },
  { id: 46, description: 'DCR-011-ENG - Connecting to Shore Power', claimNumber: 43, claimAmount: 27300.00, taxRate5: true, taxRate15: false, taxAmount: 1365.00, totalToDate: 28665.00, group: 'DCR', groupLabel: 'DCR Claims' },
  { id: 47, description: 'DCR-013-ENG - Connecting to Shore Power', claimNumber: 44, claimAmount: 7000.00, taxRate5: true, taxRate15: false, taxAmount: 350.00, totalToDate: 7350.00, group: 'DCR', groupLabel: 'DCR Claims' },
  { id: 48, description: 'DCR-014-ENG - Storage Cabinets in Z Drive', claimNumber: 45, claimAmount: 5180.00, taxRate5: true, taxRate15: false, taxAmount: 259.00, totalToDate: 5439.00, group: 'DCR', groupLabel: 'DCR Claims' },
  { id: 49, description: 'DCR-015-ENG - Exterior Superstructure Light Fixtures', claimNumber: 46, claimAmount: 3640.00, taxRate5: true, taxRate15: false, taxAmount: 182.00, totalToDate: 3822.00, group: 'DCR', groupLabel: 'DCR Claims' },
  // Milestone 6.b.1
  { id: 50, description: 'Milestone 6.b.1 Claim 47', claimNumber: 47, claimAmount: 877506.57, taxRate5: true, taxRate15: false, taxAmount: 43875.33, totalToDate: 921381.90, group: 'M6B1', groupLabel: 'Milestone 6.b.1' },
  { id: 51, description: 'DCR-007-ENG - Addition of storage locker for NERT', claimNumber: 48, claimAmount: 15400.00, taxRate5: true, taxRate15: false, taxAmount: 770.00, totalToDate: 16170.00, group: 'DCR', groupLabel: 'DCR Claims' },
  // Milestone 5.b.1
  { id: 52, description: 'Milestone 5.b.1', claimNumber: 49, claimAmount: 1253444.55, taxRate5: true, taxRate15: false, taxAmount: 62672.23, totalToDate: 1316116.78, group: 'M5B1', groupLabel: 'Milestone 5.b.1' },
  // Milestone 7.1
  { id: 53, description: 'Milestone 7.1', claimNumber: 50, claimAmount: 2199318.03, taxRate5: true, taxRate15: false, taxAmount: 109965.90, totalToDate: 2309283.93, group: 'M7_1', groupLabel: 'Milestone 7.1' },
  // COVID Health and Safety Measures (Claims 50–53 in screenshot appear as series; using ids 54+ to avoid collision)
  { id: 54, description: 'DCR-019 COVID-19 Health and Safety Measures Nov 2020-March 2021', claimNumber: 51, claimAmount: 125500.66, taxRate5: true, taxRate15: false, taxAmount: 6275.03, totalToDate: 131775.69, group: 'COVID', groupLabel: 'COVID Measures' },
  { id: 55, description: 'DCR-019 COVID-19 Health and Safety Measures April 2021-February 2022', claimNumber: 51, claimAmount: 400027.11, taxRate5: true, taxRate15: false, taxAmount: 20001.36, totalToDate: 420028.47, group: 'COVID', groupLabel: 'COVID Measures' },
  { id: 56, description: 'DCR-019 COVID-19 Health and Safety Measures Nov 2020 - February 2022', claimNumber: 52, claimAmount: 525527.77, taxRate5: true, taxRate15: false, taxAmount: 26276.39, totalToDate: 551804.16, group: 'COVID', groupLabel: 'COVID Measures' },
  { id: 57, description: 'DCR-019 COVID-19 Health and Safety Measures March 2022', claimNumber: 52, claimAmount: 61287.17, taxRate5: true, taxRate15: false, taxAmount: 3064.36, totalToDate: 64351.53, group: 'COVID', groupLabel: 'COVID Measures' },
  { id: 58, description: 'DCR-019 COVID-19 Health and Safety Measures April 2022', claimNumber: 53, claimAmount: 74652.20, taxRate5: true, taxRate15: false, taxAmount: 3732.61, totalToDate: 78384.81, group: 'COVID', groupLabel: 'COVID Measures' }
  ,
  // --- Appended from latest spreadsheet ("ajoutons ceci a la suite") ---
  // DCR-017 Early order of Material (Claim 54)
  { id: 59, description: 'DCR-017-228 Early order of Material', claimNumber: 54, claimAmount: 134333.66, taxRate5: true, taxRate15: false, taxAmount: 6716.68, totalToDate: 141050.34, group: 'DCR017', groupLabel: 'DCR-017 Early order of Material' },
  { id: 60, description: 'DCR-017-229 Early order of Material', claimNumber: 54, claimAmount: 149985.42, taxRate5: true, taxRate15: false, taxAmount: 7499.27, totalToDate: 157456.34, group: 'DCR017', groupLabel: 'DCR-017 Early order of Material' },
  // DCR-006 Tie-down aft deck (Claim 55)
  { id: 61, description: 'DCR-006-228 Tie-down aft deck', claimNumber: 55, claimAmount: 54970.00, taxRate5: true, taxRate15: false, taxAmount: 2748.50, totalToDate: 57718.50, group: 'DCR006', groupLabel: 'DCR-006 Tie-down aft deck' },
  { id: 62, description: 'DCR-006-229 Tie-down aft deck', claimNumber: 55, claimAmount: 49773.00, taxRate5: true, taxRate15: false, taxAmount: 2488.65, totalToDate: 52261.65, group: 'DCR006', groupLabel: 'DCR-006 Tie-down aft deck' },
  // DCR-019 May 2022 (Claim 56)
  { id: 63, description: 'DCR-019 COVID-19 Health and Safety Measures May 2022', claimNumber: 56, claimAmount: 57320.63, taxRate5: true, taxRate15: false, taxAmount: 2866.03, totalToDate: 60186.66, group: 'COVID', groupLabel: 'COVID Measures' },
  // Milestone 6.2.b (Claim 57)
  { id: 64, description: 'Milestone 6.2.b', claimNumber: 57, claimAmount: 877506.57, taxRate5: true, taxRate15: false, taxAmount: 43875.33, totalToDate: 921381.90, group: 'M6_2B', groupLabel: 'Milestone 6.2.b' },
  // DCR-025 Power Lashing to Submarines (Claim 58)
  { id: 65, description: 'DCR-025-C-228 Power Lashing to Submarines', claimNumber: 58, claimAmount: 103501.66, taxRate5: true, taxRate15: false, taxAmount: 5175.08, totalToDate: 108676.74, group: 'DCR025', groupLabel: 'DCR-025 Power Lashing to Submarines' },
  { id: 66, description: 'DCR-025-C-229 Power Lashing to Submarines', claimNumber: 58, claimAmount: 95998.34, taxRate5: true, taxRate15: false, taxAmount: 4799.92, totalToDate: 100798.26, group: 'DCR025', groupLabel: 'DCR-025 Power Lashing to Submarines' },
  // Milestone 8.2.a Prime Movers installed and accepted (Claim 59)
  { id: 67, description: 'Milestone 8.2.a Prime Movers installed and accepted', claimNumber: 59, claimAmount: 879727.21, taxRate5: true, taxRate15: false, taxAmount: 43986.36, totalToDate: 923713.57, group: 'M8_2A', groupLabel: 'Milestone 8.2.a Prime Movers installed and accepted' },
  // DCR-001 Watertight Power Receptacles NOT ACCEPTED (Claim 60)
  { id: 68, description: 'NOT ACCEPTED DCR-001 C-228 Watertight Power Receptacles', claimNumber: 60, claimAmount: 0, taxRate5: true, taxRate15: false, taxAmount: 0, totalToDate: 0, group: 'DCR001', groupLabel: 'DCR-001 Watertight Power Receptacles' },
  { id: 69, description: 'NOT ACCEPTED DCR-001 C-229 Watertight Power Receptacles', claimNumber: 60, claimAmount: 0, taxRate5: true, taxRate15: false, taxAmount: 0, totalToDate: 0, group: 'DCR001', groupLabel: 'DCR-001 Watertight Power Receptacles' },
  // Milestone 8.1.a Prime Movers installed and accepted (Claim 61)
  { id: 70, description: 'Milestone 8.1.a Prime Movers installed and accepted', claimNumber: 61, claimAmount: 879727.21, taxRate5: true, taxRate15: false, taxAmount: 43986.36, totalToDate: 923713.57, group: 'M8_1A', groupLabel: 'Milestone 8.1.a Prime Movers installed and accepted' },
  // DCR-004 Heated Skyports (Claim 62)
  { id: 71, description: 'DCR-004 Heated Skyports - C-228', claimNumber: 62, claimAmount: 14157.00, taxRate5: true, taxRate15: false, taxAmount: 707.85, totalToDate: 14864.85, group: 'DCR004', groupLabel: 'DCR-004 Heated Skyports' },
  { id: 72, description: 'DCR-004 Heated Skyports - C-229', claimNumber: 62, claimAmount: 13728.00, taxRate5: true, taxRate15: false, taxAmount: 686.40, totalToDate: 14414.40, group: 'DCR004', groupLabel: 'DCR-004 Heated Skyports' },
  // DCR-011 Connecting to Shore Power NOT ACCEPTED (Claim 63)
  { id: 73, description: 'NOT ACCEPTED DCR-011 Connecting to Shore Power C-228', claimNumber: 63, claimAmount: 0, taxRate5: true, taxRate15: false, taxAmount: 0, totalToDate: 0, group: 'DCR011', groupLabel: 'DCR-011 Connecting to Shore Power' },
  { id: 74, description: 'NOT ACCEPTED DCR-011 Connecting to Shore Power C-229', claimNumber: 63, claimAmount: 0, taxRate5: true, taxRate15: false, taxAmount: 0, totalToDate: 0, group: 'DCR011', groupLabel: 'DCR-011 Connecting to Shore Power' },
  // DCR-009 ENG and Space Heaters (Claim 64)
  { id: 75, description: 'DCR-009 ENG', claimNumber: 64, claimAmount: 27853.20, taxRate5: true, taxRate15: false, taxAmount: 1392.66, totalToDate: 29245.86, group: 'DCR009', groupLabel: 'DCR-009 ENG and Space Heaters' },
  { id: 76, description: 'DCR-009 Space Heaters C-228', claimNumber: 64, claimAmount: 97627.60, taxRate5: true, taxRate15: false, taxAmount: 4881.38, totalToDate: 102508.98, group: 'DCR009', groupLabel: 'DCR-009 ENG and Space Heaters' },
  // DCR-015 Exterior Superstructure Light Fixtures NOT ACCEPTED (Claim 65)
  { id: 77, description: 'NOT ACCEPTED DCR-015 Exterior Superstructure Light Fixtures (1)', claimNumber: 65, claimAmount: 0, taxRate5: true, taxRate15: false, taxAmount: 0, totalToDate: 0, group: 'DCR015', groupLabel: 'DCR-015 Exterior Superstructure Light Fixtures' },
  { id: 78, description: 'NOT ACCEPTED DCR-015 Exterior Superstructure Light Fixtures (2)', claimNumber: 65, claimAmount: 0, taxRate5: true, taxRate15: false, taxAmount: 0, totalToDate: 0, group: 'DCR015', groupLabel: 'DCR-015 Exterior Superstructure Light Fixtures' },
  // DCR-027 Grey Water Treatment (Claim 66)
  { id: 79, description: 'DCR-027 Grey Water Treatment C-228', claimNumber: 66, claimAmount: 44676.18, taxRate5: true, taxRate15: false, taxAmount: 2233.81, totalToDate: 46909.99, group: 'DCR027', groupLabel: 'DCR-027 Grey Water Treatment' },
  // DCR-020 COVID-19 Subcontractor Cost Assistance (Claim 67)
  { id: 80, description: 'DCR-020 COVID-19 Subcontractor Cost Assistance Jan-Mar 2022', claimNumber: 67, claimAmount: 977272.16, taxRate5: true, taxRate15: false, taxAmount: 48863.61, totalToDate: 1026135.77, group: 'DCR020', groupLabel: 'DCR-020 COVID-19 Subcontractor Cost Assistance' }
  ,
  // --- Second screenshot appended items ---
  { id: 81, description: 'Milestone #7.2b Hull, deck and wheelhouse enclosed and accepted by Canada', claimNumber: 68, claimAmount: 2199318.03, taxRate5: true, taxRate15: false, taxAmount: 109965.90, totalToDate: 2309283.93, group: 'M7_2B', groupLabel: 'Milestone #7.2b' },
  { id: 82, description: 'NOT ACCEPTED DCR-020 Subcontractor Cost Assistance Apr-May-Jun 2022', claimNumber: 69, claimAmount: 0, taxRate5: true, taxRate15: false, taxAmount: 0, totalToDate: 0, group: 'DCR020', groupLabel: 'DCR-020 Subcontractor Cost Assistance' },
  { id: 83, description: 'DCR-020 Subcontractor Cost Assistance Apr-May-Jun 2022', claimNumber: 73, claimAmount: 1492798.45, taxRate5: true, taxRate15: false, taxAmount: 74639.92, totalToDate: 1567438.37, group: 'DCR020', groupLabel: 'DCR-020 Subcontractor Cost Assistance' },
  { id: 84, description: 'Milestone #8.1.b Prime Movers Alignment', claimNumber: 70, claimAmount: 1319590.82, taxRate5: true, taxRate15: false, taxAmount: 65979.54, totalToDate: 1385570.36, group: 'M8_1B', groupLabel: 'Milestone #8.1.b' },
  { id: 85, description: 'Milestone #16.a Completion Aboriginal Report C-228, C-229', claimNumber: 71, claimAmount: 219931.80, taxRate5: true, taxRate15: false, taxAmount: 10996.59, totalToDate: 230928.39, group: 'M16A', groupLabel: 'Milestone #16.a' },
  { id: 86, description: 'Milestone #16.a Completion Aboriginal Report C-230, C-231', claimNumber: 71, claimAmount: 219931.80, taxRate5: false, taxRate15: true, taxAmount: 32989.77, totalToDate: 252921.57, group: 'M16A', groupLabel: 'Milestone #16.a' },
  { id: 87, description: 'Milestone #5.3.b Delivery of Propulsion Machinery', claimNumber: 72, claimAmount: 1253444.55, taxRate5: false, taxRate15: true, taxAmount: 188016.68, totalToDate: 1441461.23, group: 'M5_3B', groupLabel: 'Milestone #5.3.b' },
  { id: 88, description: 'Milestone #6.3.b Delivery of Electrical Equipment', claimNumber: 74, claimAmount: 877506.57, taxRate5: false, taxRate15: true, taxAmount: 131625.99, totalToDate: 1009132.56, group: 'M6_3B', groupLabel: 'Milestone #6.3.b' },
  { id: 89, description: 'DCR-020 Subcontractor Cost Assistance July 2022', claimNumber: 75, claimAmount: 485299.91, taxRate5: true, taxRate15: false, taxAmount: 24265.00, totalToDate: 509564.91, group: 'DCR020', groupLabel: 'DCR-020 Subcontractor Cost Assistance' },
  { id: 90, description: 'DCR-020 Subcontractor Cost Assistance August 2022', claimNumber: 76, claimAmount: 550343.25, taxRate5: true, taxRate15: false, taxAmount: 27517.16, totalToDate: 577860.41, group: 'DCR020', groupLabel: 'DCR-020 Subcontractor Cost Assistance' },
  { id: 91, description: 'Milestone #5.4.b Delivery of Propulsion Machinery', claimNumber: 77, claimAmount: 1253444.55, taxRate5: false, taxRate15: true, taxAmount: 188016.68, totalToDate: 1441461.23, group: 'M5_4B', groupLabel: 'Milestone #5.4.b' },
  { id: 92, description: 'Milestone #6.4.b Delivery of Electrical Equipment Package', claimNumber: 78, claimAmount: 877506.57, taxRate5: false, taxRate15: true, taxAmount: 131625.99, totalToDate: 1009132.56, group: 'M6_4B', groupLabel: 'Milestone #6.4.b' },
  { id: 93, description: 'Milestone #16.b Completion Aboriginal Report C-228, C-229', claimNumber: 79, claimAmount: 219931.80, taxRate5: true, taxRate15: false, taxAmount: 10996.59, totalToDate: 230928.39, group: 'M16B', groupLabel: 'Milestone #16.b' },
  { id: 94, description: 'Milestone #16.b Completion Aboriginal Report C-230, C-231', claimNumber: 79, claimAmount: 219931.80, taxRate5: false, taxRate15: true, taxAmount: 32989.77, totalToDate: 252921.57, group: 'M16B', groupLabel: 'Milestone #16.b' },
  { id: 95, description: 'Milestone #10.1 C-228 CVM Template', claimNumber: 80, claimAmount: 109965.90, taxRate5: true, taxRate15: false, taxAmount: 5498.30, totalToDate: 115464.20, group: 'M10_1', groupLabel: 'Milestone #10.1' },
  { id: 96, description: 'Milestone #10.1 C-229 CVM Template', claimNumber: 80, claimAmount: 109965.90, taxRate5: true, taxRate15: false, taxAmount: 5498.30, totalToDate: 115464.20, group: 'M10_1', groupLabel: 'Milestone #10.1' },
  { id: 97, description: 'Milestone #10.1 C-230 CVM Template', claimNumber: 80, claimAmount: 109965.90, taxRate5: false, taxRate15: true, taxAmount: 16494.89, totalToDate: 126460.79, group: 'M10_1', groupLabel: 'Milestone #10.1' },
  { id: 98, description: 'Milestone #10.1 C-231 CVM Template', claimNumber: 80, claimAmount: 109965.90, taxRate5: false, taxRate15: true, taxAmount: 16494.89, totalToDate: 126460.79, group: 'M10_1', groupLabel: 'Milestone #10.1' },
  { id: 99, description: 'Milestone #13.1 ILS documents (Draft) received and accepted (NLT1 & NLT2)', claimNumber: 81, claimAmount: 131959.08, taxRate5: true, taxRate15: false, taxAmount: 6597.95, totalToDate: 138557.03, group: 'M13_1', groupLabel: 'Milestone #13.1' },
  { id: 100, description: 'Milestone #13.1 ILS documents (Draft) received and accepted (NLT3 & NLT4)', claimNumber: 81, claimAmount: 131959.08, taxRate5: false, taxRate15: true, taxAmount: 19793.86, totalToDate: 151752.94, group: 'M13_1', groupLabel: 'Milestone #13.1' },
  { id: 101, description: 'Claim 82 DCR-001 Exterior Watertight Power Receptacles NLT 1', claimNumber: 82, claimAmount: 16163.50, taxRate5: true, taxRate15: false, taxAmount: 808.18, totalToDate: 16971.68, group: 'DCR001', groupLabel: 'DCR-001 Watertight Power Receptacles' },
  // === Third screenshot additions (claims 101 - 112) ===
  { id: 102, description: 'Claim 101 Test and Trials Program Complete and Accepted by Canada C-228', claimNumber: 101, claimAmount: 164948.85, taxRate5: true, taxRate15: false, taxAmount: 8247.44, totalToDate: 173196.29, group: 'TEST_TRIALS', groupLabel: 'Test & Trials Program' },
  { id: 103, description: 'Claim 101 Test and Trials Program Complete and Accepted by Canada C-229', claimNumber: 101, claimAmount: 164948.85, taxRate5: true, taxRate15: false, taxAmount: 8247.44, totalToDate: 173196.29, group: 'TEST_TRIALS', groupLabel: 'Test & Trials Program' },
  { id: 104, description: 'Claim 102 Test and Trials Program Complete and Accepted by Canada C-230', claimNumber: 102, claimAmount: 164948.85, taxRate5: false, taxRate15: true, taxAmount: 24742.33, totalToDate: 189691.18, group: 'TEST_TRIALS', groupLabel: 'Test & Trials Program' },
  { id: 105, description: 'Claim 102 Test and Trials Program Complete and Accepted by Canada C-231', claimNumber: 102, claimAmount: 164948.85, taxRate5: false, taxRate15: true, taxAmount: 24742.33, totalToDate: 189691.18, group: 'TEST_TRIALS', groupLabel: 'Test & Trials Program' },
  { id: 106, description: 'Claim 103 DCR-023 TDP Partitioning', claimNumber: 103, claimAmount: 4620.00, taxRate5: true, taxRate15: false, taxAmount: 231.00, totalToDate: 4851.00, group: 'DCR023', groupLabel: 'DCR-023 TDP Partitioning' },
  { id: 107, description: 'Claim 104 Milestone 8.2b2 Final alignment complete and accepted by Canada', claimNumber: 104, claimAmount: 791754.49, taxRate5: true, taxRate15: false, taxAmount: 39587.72, totalToDate: 831342.21, group: 'M8_2B2', groupLabel: 'Milestone 8.2b2 Final alignment' },
  { id: 108, description: 'Claim 105 Milestone 12.1b1 RSPL complete and accepted by Canada', claimNumber: 105, claimAmount: 70374.73, taxRate5: true, taxRate15: false, taxAmount: 3518.74, totalToDate: 73893.47, group: 'M12_1B1', groupLabel: 'Milestone 12.1b1 RSPL' },
  { id: 109, description: 'Claim 106 Milestone 10.1b1 Upon Provisional Acceptance Certification signed by Canada', claimNumber: 106, claimAmount: 494846.55, taxRate5: false, taxRate15: true, taxAmount: 24742.33, totalToDate: 519588.88, group: 'M10_1B1', groupLabel: 'Milestone 10.1b1 Provisional Acceptance' },
  { id: 110, description: 'Claim 107 Milestone 9.1d Trials Reports Submitted and Accepted by Canada', claimNumber: 107, claimAmount: 659795.41, taxRate5: false, taxRate15: true, taxAmount: 32989.77, totalToDate: 692785.18, group: 'M9_1D', groupLabel: 'Milestone 9.1d Trials Reports' },
  { id: 111, description: 'Claim 108 Milestone 12.2b1 RSPL Complete and Accepted by Canada', claimNumber: 108, claimAmount: 70374.73, taxRate5: true, taxRate15: false, taxAmount: 3518.74, totalToDate: 73893.47, group: 'M12_2B1', groupLabel: 'Milestone 12.2b1 RSPL' },
  { id: 112, description: 'Claim 109 Milestone 10.2b1 Provisional Acceptance 50%', claimNumber: 109, claimAmount: 494846.56, taxRate5: true, taxRate15: false, taxAmount: 24742.33, totalToDate: 519588.89, group: 'M10_2B1', groupLabel: 'Milestone 10.2b1 Provisional Acceptance 50%' },
  { id: 113, description: 'Claim 110 Milestone 9.1c Trials Conduct Complete and Accepted by CAN', claimNumber: 110, claimAmount: 1484539.67, taxRate5: true, taxRate15: false, taxAmount: 74226.98, totalToDate: 1558766.65, group: 'M9_1C', groupLabel: 'Milestone 9.1c Trials Conduct Complete' },
  { id: 114, description: 'Claim 111 Milestone 9.2c Trials Conduct Complete and Accepted by CAN', claimNumber: 111, claimAmount: 1484539.67, taxRate5: true, taxRate15: false, taxAmount: 74226.98, totalToDate: 1558766.65, group: 'M9_2C', groupLabel: 'Milestone 9.2c Trials Conduct Complete' },
  { id: 115, description: 'Claim 112 Milestone 9.2d Trials Reports Submitted and Accepted by CAN', claimNumber: 112, claimAmount: 659795.41, taxRate5: false, taxRate15: true, taxAmount: 32989.77, totalToDate: 692785.18, group: 'M9_2D', groupLabel: 'Milestone 9.2d Trials Reports Submitted' },
  // === Fourth screenshot additions (claims 113 - 122) ===
  { id: 116, description: 'Claim 113 Milestone 14.b1 Training Plan including course manuals complete and accepted by CAN', claimNumber: 113, claimAmount: 196909.92, taxRate5: true, taxRate15: false, taxAmount: 9845.50, totalToDate: 206755.42, group: 'M14_B1', groupLabel: 'Milestone 14.b1 Training Plan' },
  { id: 117, description: 'Claim 114 Milestone 14.b3b1-14.b4b1 Training Plan including course manuals complete and accepted by CAN', claimNumber: 114, claimAmount: 196909.92, taxRate5: false, taxRate15: true, taxAmount: 29536.49, totalToDate: 226446.41, group: 'M14_B3B1', groupLabel: 'Milestone 14.b3b1-14.b4b1 Training Plan' },
  { id: 118, description: 'Claim 115 Milestone 12.1b2 12.2b2 Spares verified by Canada at shipyard before shipping', claimNumber: 115, claimAmount: 251498.88, taxRate5: true, taxRate15: false, taxAmount: 12574.94, totalToDate: 264073.82, group: 'M12_SPARES', groupLabel: 'Milestone 12 Spares Verification' },
  { id: 119, description: 'Claim 116 Milestone 10.1b2 Delivery of all ILS Products & Documents reviewed and accepted by Canada and completion of work listed in the schedules provided at Milestone 10.1b1', claimNumber: 116, claimAmount: 494846.56, taxRate5: true, taxRate15: false, taxAmount: 24742.33, totalToDate: 519588.89, group: 'M10_1B2', groupLabel: 'Milestone 10.1b2 Delivery of ILS Products' },
  { id: 120, description: 'Claim 117 Milestone 10.2b Provisional Acceptance NLT2 complete and accepted by Canada 2of2', claimNumber: 117, claimAmount: 494846.55, taxRate5: true, taxRate15: false, taxAmount: 24742.33, totalToDate: 519588.88, group: 'M10_2B_NLT2', groupLabel: 'Milestone 10.2b Provisional Acceptance NLT2' },
  { id: 121, description: 'Claim 118 Milestone 14.b2 Training Completed and accepted by Canada', claimNumber: 118, claimAmount: 459456.49, taxRate5: true, taxRate15: false, taxAmount: 22972.82, totalToDate: 482429.31, group: 'M14_B2', groupLabel: 'Milestone 14.b2 Training Completed' },
  { id: 122, description: 'Claim 119 Milestone 9.1e 9.2e Trials complete and accepted by Canada', claimNumber: 119, claimAmount: 659795.41, taxRate5: false, taxRate15: true, taxAmount: 32989.77, totalToDate: 692785.18, group: 'M9_E', groupLabel: 'Milestone 9.e Trials complete' },
  { id: 123, description: 'Claim 120 Milestone 11.1 Delivery and Final Acceptance of vessels complete at respective CFR bases (Holdback à facturer)', claimNumber: 120, claimAmount: 3194980.92, taxRate5: true, taxRate15: false, taxAmount: 159749.05, totalToDate: 3354729.97, group: 'M11_1', groupLabel: 'Milestone 11.1 Delivery & Final Acceptance' },
  { id: 124, description: 'Claim 120 Milestone 11.2 Delivery and Final Acceptance of vessels complete at respective CFR bases (Holdback à facturer)', claimNumber: 120, claimAmount: 3148800.91, taxRate5: true, taxRate15: false, taxAmount: 157400.05, totalToDate: 3305400.96, group: 'M11_2', groupLabel: 'Milestone 11.2 Delivery & Final Acceptance' },
  { id: 125, description: 'Claim 121 C-228 Milestone 17 EPA Ajustement', claimNumber: 121, claimAmount: 2000000.00, taxRate5: true, taxRate15: false, taxAmount: 100000.00, totalToDate: 2100000.00, group: 'M17_EPA', groupLabel: 'Milestone 17 EPA Ajustement' },
  { id: 126, description: 'Claim 121 C-229 Milestone 17 EPA Ajustement', claimNumber: 121, claimAmount: 2000000.00, taxRate5: true, taxRate15: false, taxAmount: 100000.00, totalToDate: 2100000.00, group: 'M17_EPA', groupLabel: 'Milestone 17 EPA Ajustement' },
  { id: 127, description: 'Claim 122 C-228 Milestone 13.2b All Technical Data Package elements delivered and accepted by Canada', claimNumber: 122, claimAmount: 593815.87, taxRate5: true, taxRate15: false, taxAmount: 29690.79, totalToDate: 623506.66, group: 'M13_2B', groupLabel: 'Milestone 13.2b Technical Data Package' },
  { id: 128, description: 'Claim 122 C-229 Milestone 13.2b All Technical Data Package elements delivered and accepted by Canada', claimNumber: 122, claimAmount: 593815.87, taxRate5: true, taxRate15: false, taxAmount: 29690.79, totalToDate: 623506.66, group: 'M13_2B', groupLabel: 'Milestone 13.2b Technical Data Package' }
  ,
  // === Fifth screenshot additions (claims 123 - 136) ===
  // Claim 123 Final Delivery to Destination (two vessels)
  { id: 129, description: 'Claim 123 C-228 Milestone 19.a Final Delivery to Destination and all Contractual Deliverables Completed and Accepted', claimNumber: 123, claimAmount: 3000000.00, taxRate5: true, taxRate15: false, taxAmount: 150000.00, totalToDate: 3150000.00, group: 'M19A', groupLabel: 'Milestone 19.a Final Delivery' },
  { id: 130, description: 'Claim 123 C-229 Milestone 19.a Final Delivery to Destination and all Contractual Deliverables Completed and Accepted', claimNumber: 123, claimAmount: 3000000.00, taxRate5: true, taxRate15: false, taxAmount: 150000.00, totalToDate: 3150000.00, group: 'M19A', groupLabel: 'Milestone 19.a Final Delivery' },
  // Claim 124 Pre-Requisites Complete (two vessels)
  { id: 131, description: 'Claim 124 C-228 Milestone 9.1b Pre-Requisites Complete and accepted by Canada (Commissioning, Flushing, ITP)', claimNumber: 124, claimAmount: 329897.70, taxRate5: true, taxRate15: false, taxAmount: 16494.89, totalToDate: 346392.59, group: 'M9_PREREQ', groupLabel: 'Milestone 9.x Pre-Requisites' },
  { id: 132, description: 'Claim 124 C-229 Milestone 9.2b Pre-Requisites Complete and accepted by Canada (Commissioning, Flushing, ITP)', claimNumber: 124, claimAmount: 329897.70, taxRate5: true, taxRate15: false, taxAmount: 16494.89, totalToDate: 346392.59, group: 'M9_PREREQ', groupLabel: 'Milestone 9.x Pre-Requisites' },
  // Claim 125 Cancelled Deckhouse (kept for traceability)
  { id: 133, description: 'Cancelled Claim 125 C-230 Milestone 7.3a Deckhouse Complete and accepted by Canada', claimNumber: 125, claimAmount: 0, taxRate5: false, taxRate15: true, taxAmount: 0, totalToDate: 0, group: 'M7_3A_DECKHOUSE', groupLabel: 'Milestone 7.3a Deckhouse' },
  // Claim 126 Deckhouse Complete (14% tax rate)
  { id: 134, description: 'Claim 126 Milestone 7.3a Deckhouse Complete and accepted by Canada', claimNumber: 126, claimAmount: 329897.71, taxRate5: false, taxRate15: false, taxAmount: 49484.66, totalToDate: 379382.37, group: 'M7_3A_DECKHOUSE', groupLabel: 'Milestone 7.3a Deckhouse' },
  // Claim 127 Transportation to Esquimalt (two vessels DCR-22)
  { id: 135, description: 'Claim 127 C-228 DCR-22 Transportation to Esquimalt', claimNumber: 127, claimAmount: 534977.77, taxRate5: true, taxRate15: false, taxAmount: 26748.89, totalToDate: 561726.66, group: 'DCR22', groupLabel: 'DCR-22 Transportation' },
  { id: 136, description: 'Claim 127 C-229 DCR-22 Transportation to Esquimalt', claimNumber: 127, claimAmount: 534977.77, taxRate5: true, taxRate15: false, taxAmount: 26748.89, totalToDate: 561726.66, group: 'DCR22', groupLabel: 'DCR-22 Transportation' },
  // Claim 128 DCR-28 Winches Upgrade
  { id: 137, description: 'Claim 128 C-228 DCR-28 Winches Upgrade', claimNumber: 128, claimAmount: 505961.34, taxRate5: true, taxRate15: false, taxAmount: 25298.07, totalToDate: 531259.41, group: 'DCR28', groupLabel: 'DCR-28 Winches Upgrade' },
  // Claim 129 Upgrade for THR Winches by DMT
  { id: 138, description: 'Claim 129 C-229 DCR-28 Upgrade for the THR Winches by DMT', claimNumber: 129, claimAmount: 467179.48, taxRate5: true, taxRate15: false, taxAmount: 23358.97, totalToDate: 490538.45, group: 'DCR28_THR', groupLabel: 'DCR-28 THR Winches by DMT' },
  // Claim 130 Cancelled Prime Movers Installed
  { id: 139, description: 'Cancelled Claim 130 C-230 Milestone 8.3a Prime Movers Installed and Accepted by Canada', claimNumber: 130, claimAmount: 0, taxRate5: false, taxRate15: true, taxAmount: 0, totalToDate: 0, group: 'M8_3A', groupLabel: 'Milestone 8.3a Prime Movers' },
  // Claim 131 Cancelled Hull enclosed
  { id: 140, description: 'Cancelled Claim 131 C-230 Milestone 7.3b Hull enclosed and accepted by Canada', claimNumber: 131, claimAmount: 0, taxRate5: false, taxRate15: true, taxAmount: 0, totalToDate: 0, group: 'M7_3B', groupLabel: 'Milestone 7.3b Hull enclosed' },
  // Claim 132 Fender modification Signed and Accepted (amount unknown -> placeholder 0, adjust later)
  { id: 141, description: 'Claim 132 DCR 037 - 0-00230 - Fender modification Signed and Accepted by Canada (AMOUNT TBD)', claimNumber: 132, claimAmount: 0, taxRate5: false, taxRate15: true, taxAmount: 0, totalToDate: 0, group: 'DCR037', groupLabel: 'DCR-037 Fender modification' },
  // Claim 133 Prime Movers Installed and Accepted (14% tax rate)
  { id: 142, description: 'Claim 133 C-230 Milestone 8.3a Prime Movers Installed and Accepted by Canada', claimNumber: 133, claimAmount: 879727.21, taxRate5: false, taxRate15: false, taxAmount: 123161.81, totalToDate: 1002889.02, group: 'M8_3A', groupLabel: 'Milestone 8.3a Prime Movers' },
  // Claim 134 Hull enclosed and accepted by Canada (14% tax rate)
  { id: 143, description: 'Claim 134 C-230 Milestone 7.3b Hull enclosed and accepted by Canada', claimNumber: 134, claimAmount: 989693.11, taxRate5: false, taxRate15: false, taxAmount: 138557.04, totalToDate: 1128250.15, group: 'M7_3B', groupLabel: 'Milestone 7.3b Hull enclosed' },
  // Claim 135 Fender modification Signed and Accepted (specific amount)
  { id: 144, description: 'Claim 135 DCR 037 - 0-00230 - Fender modification Signed and Accepted by Canada', claimNumber: 135, claimAmount: 7903.00, taxRate5: false, taxRate15: true, taxAmount: 1106.42, totalToDate: 9009.42, group: 'DCR037', groupLabel: 'DCR-037 Fender modification' },
  // Claim 136 Deckhouse and hull assembly complete and accepted (14% tax rate)
  { id: 145, description: 'Claim 136 C-230 Milestone 7.3c Deckhouse and hull assembly complete and accepted by Canada', claimNumber: 136, claimAmount: 879727.21, taxRate5: false, taxRate15: false, taxAmount: 123161.81, totalToDate: 1002889.02, group: 'M7_3C', groupLabel: 'Milestone 7.3c Deckhouse & Hull assembly' },
  
  // === Final screenshot additions (claims 137-140) ===
  // Claim 137 Milestone 7 for NLT 3 completed and accepted by Canada (14% tax rate)
  { id: 146, description: 'Claim 137 C-230 19.c Milestone 7 for NLT 3 completed and accepted by Canada', claimNumber: 137, claimAmount: 1400000.00, taxRate5: false, taxRate15: false, taxAmount: 196000.00, totalToDate: 1596000.00, group: 'M7_NLT3', groupLabel: 'Milestone 7 for NLT 3' },
  
  // Claim 138 Milestone 11.1 Delivery and Final Acceptance (Holdback Reference claim 120) (5% tax rate)
  { id: 147, description: 'Claim 138 C-228 Milestone 11.1 Delivery and Final Acceptance of vessels complete at respective CFR bases Holdback (Reference claim 120)', claimNumber: 138, claimAmount: 103996.12, taxRate5: true, taxRate15: false, taxAmount: 5199.81, totalToDate: 109195.93, group: 'M11_1_HOLDBACK', groupLabel: 'Milestone 11.1 Holdback' },
  
  // Claim 138 Milestone 11.2 Delivery and Final Acceptance (Holdback Reference claim 120) (5% tax rate)
  { id: 148, description: 'Claim 138 C-229 Milestone 11.2 Delivery and Final Acceptance of vessels complete at respective CFR bases Holdback (Reference claim 120)', claimNumber: 138, claimAmount: 150976.13, taxRate5: true, taxRate15: false, taxAmount: 7548.81, totalToDate: 158524.94, group: 'M11_2_HOLDBACK', groupLabel: 'Milestone 11.2 Holdback' },
  
  // Claim 139 DCR 001 Exterior Watertight Power Receptacles (14% tax rate)
  { id: 149, description: 'Claim 139 C-230-DCR 001 Exterior Watertight Power Receptacles', claimNumber: 139, claimAmount: 16041.25, taxRate5: false, taxRate15: false, taxAmount: 2245.78, totalToDate: 18287.03, group: 'DCR001_230', groupLabel: 'DCR-001 C-230 Watertight Power Receptacles' }
]
