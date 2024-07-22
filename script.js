 async function fetchThumbnail() {
            const url = document.getElementById('video-url').value;
            const videoId = extractVideoId(url);
            if (videoId) {
                const qualities = ['default', 'mqdefault', 'hqdefault', 'sddefault', 'maxresdefault'];
                const qualityNames = ['Default', 'Medium', 'High', 'Standard', 'Maximum'];
                const thumbnailContainer = document.getElementById('thumbnail-container');

                thumbnailContainer.innerHTML = '';

                for (let i = 0; i < qualities.length; i++) {
                    const quality = qualities[i];
                    const qualityName = qualityNames[i];
                    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;

                    const img = document.createElement('img');
                    img.src = thumbnailUrl;
                    img.alt = `YouTube Thumbnail ${qualityName}`;
                    img.title = `YouTube Thumbnail ${qualityName}`;

                    const details = document.createElement('div');
                    details.className = 'thumbnail-details';

                    const qualitySpan = document.createElement('span');
                    qualitySpan.textContent = `Quality: ${qualityName}`;
                    details.appendChild(qualitySpan);

                    const link = document.createElement('a');
                    link.href = thumbnailUrl;
                    link.className = 'download-button';
                    link.download = `thumbnail_${quality}.jpg`;
                    link.textContent = 'Download';
                    link.target = '_blank';
                    details.appendChild(link);

                    // Fetch image size
                    const image = new Image();
                    image.src = thumbnailUrl;
                    image.onload = function () {
                        const sizeInfo = document.createElement('span');
                        sizeInfo.textContent = `Size: ${image.width}x${image.height}`;
                        details.insertBefore(sizeInfo, link);
                    };

                    thumbnailContainer.appendChild(img);
                    thumbnailContainer.appendChild(details);
                }
            } else {
                alert('Invalid YouTube URL');
            }
        }

        function extractVideoId(url) {
            const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=|\S*?[?&]vi=)([a-zA-Z0-9_-]{11})|(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})/;
            const match = url.match(regex);
            return match ? (match[1] || match[2]) : null;
        }