const webserviceMessages = {
  de: {
    yodorada: {
      page: {
        account: 'Mein Konto',
        logs: 'System-Logs',
        files: 'Datei-Verwaltung'
      },
      buttons: {
        account: 'Konto bearbeiten'
      },
      inputs: {
        rights: {
          resource: {
            type: {
              collection: 'Listen-Ansicht',
              resource: 'Detail-Ansicht',
              info: 'Info-Ansicht'
            }
          }
        }
      },
      errors: {
        api: {
          generic: 'Ein Fehler ist aufgetreten: %{msg}'
        },
        fields: {
          required: 'Dieses Feld wird benötigt.'
        }
      },
      hints: {
        fields: {
          password:
            'Muss aus mindestens 8 Zeichen bestehen und mindestens eine Zahl enthalten. Zulässige Sonderzeichen: -_. (Minus, Unterstrich, Punkt)'
        }
      },
      groups: {
        titlelist: 'Benutzergruppen',
        children: {
          users: 'Benutzer'
        },
        roles: {
          admins: 'Administratoren',
          editors: 'Editoren',
          users: 'Benutzer'
        }
      },
      users: {
        titlelist: 'Benutzer',
        references: {
          groupname: 'Benutzergruppe',
          groupsId: 'Benutzergruppen-ID'
        }
      },
      projects: {
        titlelist: 'Projekte',
        references: {
          username: 'Benutzername'
        }
      },
      bundles: {
        titlelist: 'Bundles',
        references: {
          projectname: 'Projekt'
        }
      },
      orders: {
        titlelist: 'Bestellungen',
        references: {
          projectname: 'Projekt'
        }
      },

      logs: {
        titlelist: 'System-Logs',
        references: {
          username: 'Benutzer'
        }
      }
    },
    resources: {
      groups: {
        name: 'Benutzergruppe |||| Benutzergruppen',
        fields: {
          groupname: 'Benutzergruppe',
          editorname: 'Benutzergruppe',
          grouprights: 'Rechte',
          isFilemaker: 'FileMaker',
          role: 'Rolle',
          enabled: 'aktiviert'
        }
      },
      projects: {
        name: 'Projekt |||| Projekte',
        fields: {
          name: 'Projektname',
          description: 'Kurztext',
          enabled: 'aktiviert'
        }
      },
      bundles: {
        name: 'Bundle |||| Bundles',
        fields: {
          deviceName: 'Gerät',
          deviceDescription: 'Kurztext',
          enabled: 'aktiviert'
        }
      },
      orders: {
        name: 'Bestellung |||| Bestellungen',
        fields: {
          processed: 'FM',
          articles: '',
          paymentType: 'Zahlart',
          paymentRuntime: 'LZ',
          paymentAmount: 'Betrag',
          namekind: 'Kind'
        }
      },

      users: {
        name: 'Benutzer',
        fields: {
          username: 'Benutzername',
          email: 'Email',
          password: 'Passwort',
          group: 'Benutzergruppe',
          enabled: 'aktiviert',
          overrideGroupRights: 'Gruppen-Rechte überschreiben?'
        }
      },

      files: {
        name: 'Datei |||| Dateien',
        fields: {
          filename: 'Dateiname',
          path: {
            absolute: ''
          }
        }
      },

      logs: {
        fields: {
          httpStatusCode: 'Code'
        }
      }
    }
  },
  en: {
    yodorada: {
      errors: {
        api: {
          generic: 'An error occured: '
        },
        fields: {
          required: 'Required.'
        }
      },
      groups: {
        children: {
          users: 'Users'
        },
        roles: {
          admins: 'Administrators',
          editors: 'Editors',
          users: 'Users'
        }
      },
      authors: {
        children: {
          aphorisms: 'Aphorisms'
        }
      }
    },
    resources: {
      groups: {
        name: 'Group |||| Groups',
        fields: {
          groupname: 'Groupname',
          role: 'Role'
        }
      },
      authors: {
        name: 'Author |||| Authors',
        fields: {
          authorname: 'Authorname'
        }
      }
    }
  }
};
export default webserviceMessages;
