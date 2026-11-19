# Hoerandner Family Archive - navy theme edition 6

This is the GitHub Pages hosting package. The public landing page includes the
original family crest. The family records and all source photographs are stored
in the encrypted file `assets/archive.enc`. The shared password is intentionally
NOT recorded in these website files. Obtain it privately from the owner.

## Publish on GitHub Pages

1. Create a NEW repository for the family archive. Do not add the old private HTML,
   private JSON, original family-chart photographs, audit CSVs, or password notes.
   If an older repository already contains plaintext family information, use a
   clean repository: deleting a file alone does not remove its Git history.
2. Extract this ZIP. Upload its CONTENTS with `index.html` at the repository root
   and the entire `assets` folder beside it. Preserve `.nojekyll` and `robots.txt`.
3. In repository Settings > Pages, choose "Deploy from a branch", select your
   publishing branch (usually `main`) and `/(root)`, then save.
4. Open the HTTPS address shown by GitHub Pages. For a project repository, it has
   the form `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`.
5. Test the landing page, an incorrect password, the agreed password, English and
   German, profile search/close, source photographs, and Lock on your actual devices.

The navy-theme update changes styling only. The encrypted payload, encryption
configuration, original crest, and application scripts are identical to edition 5.
The encryption format intentionally remains version 5. This package has not been
published to a live account.
Official setup: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## What visitors see

- Landing page with the original, uncropped crest and English/German switch.
- Case-sensitive password field; the password is not displayed as a hint.
- After successful decryption, the existing full-featured family-tree interface.
- Both Home and Lock return to the locked welcome page. Reloading also locks it.
- Names, dates and family relationships are unchanged from edition 4, including
  its source-spelling audit and uncertainty flags. This is not a new genealogy audit.

## Important privacy and security limits

- This is browser-side encryption for a static site, not individual user accounts
  or a server-enforced login. Anyone can download the encrypted file and try
  candidate passwords offline. A short or common password is not strong protection.
- Anyone who knows the password can read, export and copy the entire archive.
  Locking does not revoke already downloaded or exported copies.
- The site stores neither the password nor the decrypted archive in browser
  localStorage/sessionStorage. Only the interface language is remembered. A browser
  or password manager may independently offer to save the password.
- No automatic unlock, third-party scripts, analytics, external fonts or trackers
  are included. The website uses native Web Crypto and gzip decompression.
- The family crest and general welcome text are intentionally public. Personal
  records and photographed charts are encrypted. `robots.txt` / `noindex` are
  search-engine requests, NOT access controls.
- GitHub Pages is normally public even when the source repository is private.
  Repository visibility is not a substitute for privacy protection.
- Changing a password requires re-encrypting the archive and replacing BOTH
  `archive.enc` and `archive-config.json`. Do not add a plaintext password to JS.
  Copies encrypted under the old password may remain in Git history or downloads.
- Use a long, unique passphrase before sharing sensitive information more widely.
  For stronger access control, use authenticated hosting rather than a shared
  password on a static website. This build is not a professional security audit.

## Implementation and compatibility

AES-256-GCM, a fresh 16-byte random salt and 12-byte random IV, PBKDF2-HMAC-SHA256
with 600,000 iterations, and an authenticated `FamilyArchive-v5` version marker.
The JSON and image payload is gzip-compressed BEFORE encryption. The encryption
key and password are not included in this package. The website must be served
via HTTPS (localhost is used only for development). Use a current browser with
Web Crypto and DecompressionStream support.

Technical references:
- https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveKey
- https://developer.mozilla.org/en-US/docs/Web/API/DecompressionStream

## Deutsch

Diese Ausgabe zeigt zuerst die Startseite mit dem unveraenderten Originalwappen.
Erst nach Eingabe des gemeinsamen, gross-/kleinschreibungssensitiven Passworts
werden Familiendaten und Originalfotos im Browser entschluesselt. Das Passwort
ist nicht in diesem Paket enthalten. Startseite und Sperren beenden den Zugriff
und laden die geschuetzte Startseite neu.

Zum Veroeffentlichen den ZIP-Inhalt in ein NEUES Repository hochladen. `index.html`
muss im Stammverzeichnis liegen; der Ordner `assets` bleibt daneben. Unter
Settings > Pages die Veroeffentlichung vom Branch und `/(root)` auswaehlen.
Keine alten privaten HTML-/JSON-Dateien, Originalfotos oder Passwortnotizen
hochladen. Anschliessend die HTTPS-Website auf den eigenen Geraeten pruefen.

Ein kurzes, haeufiges Passwort ist leicht zu erraten. Diese Loesung bietet
Verschluesselung mit einem gemeinsamen Passwort, keine einzelnen Benutzerkonten.
Wer das Passwort kennt, kann alle Daten kopieren. GitHub-Seiten sind in der Regel
oeffentlich. Fuer besonders sensible Daten sind eine lange Passphrase und eine
Hosting-Loesung mit echter Benutzeranmeldung geeigneter.


## Navy design update

The homepage, header, sidebar, buttons and selected person cards now use deep
navy and slate blue inspired by the original crest. Warm ivory backgrounds and
gold accents are retained. No changes were made to family records, spellings,
relationships, photographs, password, or application behavior.

Replace the previous website files with the contents of this package. No private
JSON, plaintext family records, source photographs, or password files are included.

Visual checks were completed at desktop and mobile sizes using an in-memory
browser renderer. Search, profile dismissal and language switching were exercised.
AES-GCM decryption was independently checked with the existing password and an
incorrect password. Live URL navigation is blocked in the build environment, so
the hosted website still needs a live check after publication.
