'use client'

import { useState } from 'react'
import { DocumentTextIcon, DocumentArrowUpIcon, CheckCircleIcon, ExclamationTriangleIcon, ArrowUpTrayIcon, LockClosedIcon, EyeIcon } from '@heroicons/react/24/outline'
import PaymentClaimForm from './PaymentClaimForm'
import PWGSC1111Form from './PWGSC1111FormComplete'
import { useDocuments } from '../../contexts/DocumentsContext'

export default function MontageManagerNew() {
  const { documents, updateDocument, isDocumentAccessible, getDocumentById } = useDocuments()
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null)
  const [showPaymentClaimForm, setShowPaymentClaimForm] = useState(false)
  const [showPWGSC1111Form, setShowPWGSC1111Form] = useState(false)
  const [previewDocument, setPreviewDocument] = useState<string | null>(null)

  const handleFileImport = (documentId: string, file: File) => {
    updateDocument(documentId, { 
      fichier: file, 
      statut: 'complete',
      previewData: URL.createObjectURL(file)
    })
  }

  const handleFormulaireFill = (documentId: string) => {
    const document = getDocumentById(documentId)
    if (!document || !isDocumentAccessible(document.ordre)) {
      alert('Ce document ne peut pas être rempli pour le moment. Veuillez compléter les documents précédents d\'abord.')
      return
    }

    if (documentId === 'payment-claim') {
      setShowPaymentClaimForm(true)
    } else if (documentId === 'formulaire-1111') {
      setShowPWGSC1111Form(true)
    } else {
      setSelectedDocument(documentId)
    }
  }

  const handlePaymentClaimSave = (data: any) => {
    updateDocument('payment-claim', { 
      contenu: data, 
      statut: 'complete',
      previewData: 'Payment Claim Form complété'
    })
    setShowPaymentClaimForm(false)
  }

  const handlePWGSC1111Save = (data: any) => {
    updateDocument('formulaire-1111', { 
      contenu: data, 
      statut: 'complete',
      previewData: 'Formulaire PWGSC-1111 complété'
    })
    setShowPWGSC1111Form(false)
  }

  const getStatusIcon = (statut: string) => {
    switch (statut) {
      case 'complete':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />
      case 'en_cours':
        return <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />
      default:
        return <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
    }
  }

  const getStatusText = (statut: string): string => {
    switch (statut) {
      case 'complete':
        return 'Complété'
      case 'en_cours':
        return 'En cours'
      default:
        return 'À faire'
    }
  }

  const getStatusColor = (statut: string): string => {
    switch (statut) {
      case 'complete':
        return 'bg-green-50 border-green-200'
      case 'en_cours':
        return 'bg-yellow-50 border-yellow-200'
      default:
        return 'bg-red-50 border-red-200'
    }
  }

  const getCompletionPercentage = (): number => {
    const completed = documents.filter(doc => doc.statut === 'complete').length
    return Math.round((completed / documents.length) * 100)
  }

  return (
    <div className="space-y-6">
      {/* Test simple pour voir si ça compile */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2>Test MontageManager</h2>
        <p>Completion: {getCompletionPercentage()}%</p>
      </div>
    </div>
  )
}