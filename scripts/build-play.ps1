[CmdletBinding()]
param([string]$JavaHome = $env:JAVA_HOME)

$ErrorActionPreference = 'Stop'
$project = Split-Path $PSScriptRoot -Parent
$keyDirectory = Join-Path $env:LOCALAPPDATA 'CardTalk/play-upload'
$passwordFile = Join-Path $keyDirectory 'password.dpapi'
$storeFile = Join-Path $keyDirectory 'cardtalk-upload.p12'
$previous = @{}

function Set-BuildVariable([string]$Name, [string]$Value) {
    $previous[$Name] = [Environment]::GetEnvironmentVariable($Name, 'Process')
    [Environment]::SetEnvironmentVariable($Name, $Value, 'Process')
}

Push-Location $project
try {
    if ($JavaHome) { Set-BuildVariable 'JAVA_HOME' $JavaHome }
    if (!$env:CARDTALK_UPLOAD_STORE_FILE -and (Test-Path -LiteralPath $storeFile) -and (Test-Path -LiteralPath $passwordFile)) {
        $secret = ConvertTo-SecureString ([IO.File]::ReadAllText($passwordFile))
        try {
            $password = [Net.NetworkCredential]::new('', $secret).Password
            Set-BuildVariable 'CARDTALK_UPLOAD_STORE_FILE' $storeFile
            Set-BuildVariable 'CARDTALK_UPLOAD_KEY_ALIAS' 'cardtalk-upload'
            Set-BuildVariable 'CARDTALK_UPLOAD_STORE_PASSWORD' $password
            Set-BuildVariable 'CARDTALK_UPLOAD_KEY_PASSWORD' $password
        } finally { $secret.Dispose(); $password = $null }
    }
    & npm.cmd run build
    if ($LASTEXITCODE) { throw 'Web build failed.' }
    & .\node_modules\.bin\cap.cmd copy android
    if ($LASTEXITCODE) { throw 'Android asset copy failed.' }
    & .\android\gradlew.bat -p android :app:bundlePlay :app:assembleRelease :app:preparePlayWebsite --console=plain
    if ($LASTEXITCODE) { throw 'Signed Play build failed.' }
} finally {
    foreach ($name in $previous.Keys) { [Environment]::SetEnvironmentVariable($name, $previous[$name], 'Process') }
    Pop-Location
}
