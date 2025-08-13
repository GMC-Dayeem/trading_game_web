# Read the contents of dependencies.txt
$dependencies = Get-Content -Path "dependencies.txt"

# Skip the first line which contains project information
$dependencies = $dependencies | Select-Object -Skip 1

foreach ($line in $dependencies) {
    # Extract package names
    $packageName = $line 
    # -split '@' | Select-Object -Last 1
    if ($packageName -ne '') {
        Write-Host "Installing $packageName..."
        npm install $packageName
    }
}
