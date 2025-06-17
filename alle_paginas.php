<?php
$base_path = !empty($_SERVER["DOCUMENT_ROOT"]) ? $_SERVER["DOCUMENT_ROOT"] : __DIR__;
$http_host = isset($_SERVER["HTTP_HOST"]) ? $_SERVER["HTTP_HOST"] : "localhost";
$current_url = (isset($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] === "on" ? "https" : "http") . "://" . $http_host;

function findAllFiles($dir, $base_path, $current_url): array
{
    $results = [];
    
    if (!is_dir($dir) || !is_readable($dir)) {
        return $results;
    }
    
    $files = scandir($dir);

    foreach ($files as $file) {
        if ($file === "." || $file === "..") {
            continue;
        }

        $path = $dir . "/" . $file;

        if (is_dir($path)) {
            $sub_results = findAllFiles($path, $base_path, $current_url);
            $results = array_merge($results, $sub_results);
        } else {
            $file_extension = strtolower(pathinfo($file, PATHINFO_EXTENSION));

            if ($file_extension === "php" || $file_extension === "html") {
                $relative_path = str_replace($base_path, "", $path);
                $url = $current_url . $relative_path;
                $results[] = [
                    "type" => $file_extension,
                    "path" => $relative_path,
                    "url" => $url,
                    "filename" => $file
                ];
            }
        }
    }
    return $results;
}

$index_files = findAllFiles($base_path, $base_path, $current_url);

usort($index_files, function ($a, $b) {
    return strcmp($a["path"], $b["path"]);
});
?>

<!DOCTYPE html>
<html lang="en-US">

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <title>Alle pagina's @ Menno's plesk</title>
    <link rel="stylesheet" href="styles.css">
    <style>
        .directory-list {
            list-style: none;
            padding: 0;
        }

        .directory-item {
            padding: 10px;
            margin-bottom: 5px;
            border-left: 4px solid #444;
            background-color: #2a2a2a;
            transition: all 0.2s ease;
        }

        .directory-item:hover {
            border-left-color: #ff5722;
            background-color: #333;
        }

        .directory-link {
            text-decoration: none;
            color: #ff5722;
            font-weight: 500;
            display: block;
            font-family: Monaco, Consolas, "Lucida Console", monospace;
        }

        .directory-link:hover {
            color: #ff9800;
        }

        .type-badge {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: bold;
            margin-left: 10px;
            color: white;
        }

        .type-php {
            background-color: #8892BF;
        }

        .type-html {
            background-color: #e34c26;
        }

        .search-container {
            margin-bottom: 20px;
        }

        .filter-controls {
            display: flex;
            gap: 15px;
            margin-bottom: 20px;
            flex-wrap: wrap;
            align-items: center;
        }

        #search-input {
            padding: 8px;
            width: 300px;
            font-size: 16px;
            border: 1px solid #444;
            border-radius: 4px;
            background-color: #2a2a2a;
            color: #f0f0f0;
        }

        .filter-select {
            padding: 8px 12px;
            font-size: 14px;
            border: 1px solid #444;
            border-radius: 4px;
            background-color: #2a2a2a;
            color: #f0f0f0;
        }

        .filter-label {
            font-weight: 600;
            color: #f0f0f0;
        }

        .stats {
            margin-bottom: 20px;
            padding: 10px;
            background-color: #2a2a2a;
            border-radius: 4px;
            border-left: 4px solid #5683ff;
        }

        .stats-text {
            margin: 0;
            color: #ccc;
            font-size: 14px;
        }
    </style>
</head>

<body>
    <nav>
        <a href="index.html">Home</a>
        <a href="profiel.html">Profiel</a>
        <a href="alle_paginas.php">Alle php/html pagina's</a>
    </nav>
    <section>
        <h1>Alle HTML en PHP bestanden</h1>

    <div class="filter-controls">
        <div>
            <label for="directory-filter" class="filter-label">Directory:</label>
            <select id="directory-filter" class="filter-select" onchange="applyFilters()">
                <option value="">All Directories</option>
                <option value="lj1">LJ1</option>
                <option value="lj2">LJ2</option>
                <option value="program">Program</option>
                <option value="interface">Interface</option>
                <option value="creative_coding">Creative Coding</option>
                <option value="project">Project</option>
                <option value="kaartenbak">Kaartenbak</option>
            </select>
        </div>
        
        <div>
            <label for="type-filter" class="filter-label">File Type:</label>
            <select id="type-filter" class="filter-select" onchange="applyFilters()">
                <option value="">All Types</option>
                <option value="html">HTML</option>
                <option value="php">PHP</option>
            </select>
        </div>
        
        <div>
            <label for="subdirectory-filter" class="filter-label">Subdirectory:</label>
            <select id="subdirectory-filter" class="filter-select" onchange="applyFilters()">
                <option value="">All</option>
                <option value="javascript">JavaScript</option>
                <option value="php">PHP</option>
                <option value="html-css">HTML-CSS</option>
                <option value="opdracht">Opdracht</option>
                <option value="oefening">Oefening</option>
            </select>
        </div>
    </div>

    <div class="search-container">
        <input type="text" id="search-input" placeholder="Search files..." onkeyup="applyFilters()">
    </div>
    
    <div class="stats">
        <p class="stats-text" id="file-count">Showing all <?= count($index_files) ?> files</p>
    </div>

    <ul class="directory-list" id="directory-list">
        <?php foreach ($index_files as $file): ?>
            <li class="directory-item">
                <a href="<?= $file["url"] ?>" class="directory-link">
                    <?= $file["path"] ?>
                    <span class="type-badge type-<?= $file["type"] ?>"><?= strtoupper($file["type"]) ?></span>
                </a>
            </li>
        <?php endforeach; ?>
    </ul>
    </section>
    <footer>
        <p>
            &copy; 2025 Menno van Zoelen
        </p>
        <p>
            Contact: <a href="mailto:101945+plesk@glr.nl">101945@glr.nl</a>
        </p>
    </footer>

    <script>
        function applyFilters() {
            const searchInput = document.getElementById("search-input");
            const directoryFilter = document.getElementById("directory-filter");
            const typeFilter = document.getElementById("type-filter");
            const subdirectoryFilter = document.getElementById("subdirectory-filter");
            const fileCount = document.getElementById("file-count");
            
            const searchText = searchInput.value.toLowerCase();
            const selectedDirectory = directoryFilter.value.toLowerCase();
            const selectedType = typeFilter.value.toLowerCase();
            const selectedSubdirectory = subdirectoryFilter.value.toLowerCase();
            
            const list = document.getElementById("directory-list");
            const items = list.getElementsByClassName("directory-item");
            
            let visibleCount = 0;
            
            for (let i = 0; i < items.length; i++) {
                const link = items[i].getElementsByClassName("directory-link")[0];
                const text = link.textContent || link.innerText;
                const path = text.toLowerCase();
                
                let showItem = true;
                
                if (searchText && path.indexOf(searchText) === -1) {
                    showItem = false;
                }
                
                if (selectedDirectory && !path.includes("/" + selectedDirectory + "/") && !path.startsWith("/" + selectedDirectory)) {
                    showItem = false;
                }
                
                if (selectedType) {
                    const badge = items[i].querySelector(".type-badge");
                    const fileType = badge ? badge.textContent.toLowerCase() : "";
                    if (fileType !== selectedType) {
                        showItem = false;
                    }
                }
                
                if (selectedSubdirectory) {
                    if (!path.includes(selectedSubdirectory)) {
                        showItem = false;
                    }
                }
                
                if (showItem) {
                    items[i].style.display = "";
                    visibleCount++;
                } else {
                    items[i].style.display = "none";
                }
            }
            
            const totalFiles = <?= count($index_files) ?>;
            fileCount.textContent = `Showing ${visibleCount} of ${totalFiles} files`;
        }
        
        function filterDirectories() {
            applyFilters();
        }
    </script>
</body>

</html>